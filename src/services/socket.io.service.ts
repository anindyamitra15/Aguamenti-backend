import { Server, Socket } from "socket.io";
import { ClientToServerEvents, DevicePacket, InterServerEvents, ServerToClientEvents, SocketData, TypedServer, TypedSocket, UIPacket } from "../dtos/socket.io.dtos";
import Device from "../models/device.model";
import Schedule from "../models/schedule.model";



export function socketConnection(socket: TypedSocket) {
    console.log(`${socket.data.type} with ID:`, socket.id, "connected");

    socket.join(socket.data.endpoint as string);
    console.log("Joined endpoint:", socket.data.endpoint);

    socket.on("disconnect", onDisconnection(socket));
    socket.on("testServer", onTestServer(socket));
    socket.on("from_device", FromDeviceHandler(socket));
    socket.on("from_ui", FromUIHandler(socket));
}


const onDisconnection = (socket: TypedSocket) => {
    return () => {
        socket.leave(socket.data.endpoint as string);
        console.log("Left endpoint:", socket.data.endpoint);
        console.log(`Disconnected ${socket.data.type} from ${socket.id}`);
    };
};

const onTestServer = (socket: TypedSocket) => {
    return (data: string) => {
        console.log(data);
    };
};

const FromDeviceHandler = (socket: TypedSocket) => {
    return async (data: DevicePacket) => {
        try {
            console.log("from_device:", data);
            const epExtract = socket.data.endpoint?.split('/') as string[];
            const endpoint = epExtract[0] as string;
            const chip_id = `${epExtract[1] as string}${data.key && data.key > 0 ? `-${data.key}` : ''}`;

            const findDevice = await Device.findOne({ chip_id });

            const id_suffix = data.key as number > 0 ? `-${data.key}` : '';

            if (!findDevice) return;

            if (data.state !== null || data.state !== undefined) findDevice.state = data.state;
            if (data.value !== null || data.value !== undefined) findDevice.value = data.value;


            const findSchedule = await Schedule.findOne({ chip_id: findDevice.chip_id });
            if (findSchedule) {
                const data = findSchedule.linked_chip_id?.split('-');
                const sendData: DevicePacket = {
                    key: data[1] ? Number(data[1]) : 0,
                };

                if (findSchedule?.trigger_type === 'action') {

                    let threshold_value: any;
                    switch (findDevice.device_type) {
                        case "slider":
                            threshold_value = Number(findSchedule.threshold_value)
                            break;
                        case "tank_level":
                            threshold_value = Number(findSchedule.threshold_value)
                            break;
                        case "switch":
                            threshold_value = Boolean(findSchedule.threshold_value)
                            break;
                    }

                    let conditionMet = false;
                    switch (findSchedule.threshold_type) {
                        case "<=":
                            conditionMet = findDevice.value <= threshold_value;
                            break;
                        case ">=":
                            conditionMet = findDevice.value >= threshold_value;
                            break;
                        case ">":
                            conditionMet = findDevice.value > threshold_value;
                            break;
                        case "<":
                            conditionMet = findDevice.value < threshold_value;
                            break;
                        case "==":
                            conditionMet = findDevice.value == threshold_value;
                            break;

                    }
                    if (conditionMet)
                        switch (findSchedule.schedule_type) {
                            case "on":
                                sendData.state = true;
                                break;
                            case "off":
                                sendData.state = false;
                                break;
                        }

                    const findTriggeredDevice = await Device.findOne({ chip_id: findSchedule.linked_chip_id });
                    if (findTriggeredDevice) {
                        findTriggeredDevice.state = sendData.state;
                        findTriggeredDevice.value = sendData.value;

                        socket.broadcast
                            .to(`${endpoint as string}/${data[0]}`)
                            .emit("device_sync", { ...sendData });
                    }
                }
            }


            // sending to ui
            socket.broadcast
                .to(endpoint as string)
                .emit("to_ui", {
                    chip_id: `${socket.data.device?.chip_id}${id_suffix}`,
                    state: data.state,
                    value: data.value
                });

            await findDevice.save();
        } catch (error) {
            console.log(error as string);
        }
    };
};

const FromUIHandler = (socket: TypedSocket) => {
    return async (data: UIPacket) => {
        try {
            console.log("from_ui:", data);
            const findDevice = await Device.findOne({ chip_id: data.chip_id });
            if (!findDevice) return;

            const chip_id_key = (data.chip_id as string).split('-');
            const num_keys = chip_id_key.length;

            if (data.state !== null || data.state !== undefined) findDevice.state = data.state;
            if (data.value !== null || data.value !== undefined) findDevice.value = data.value;

            // sending to device
            socket.broadcast
                .to(`${socket.data.endpoint as string}/${chip_id_key[0]}`)
                .emit("to_device", {
                    key: (num_keys > 1) ? (chip_id_key[1] as unknown as number) : 0,
                    state: data.state,
                    value: data.value
                });

            // ui-sync
            socket.broadcast
                .to(socket.data.endpoint as string)
                .emit("ui_sync", { ...data });

            await findDevice.save();
        } catch (error) {
            console.log(error as string);
        }
    };
};
