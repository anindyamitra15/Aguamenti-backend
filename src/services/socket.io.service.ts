import { Server, Socket } from "socket.io";
import { ClientToServerEvents, DevicePacket, InterServerEvents, ServerToClientEvents, SocketData, UIPacket } from "../dtos/socket.io.dtos";
import Device from "../models/device.model";

type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

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
            const _id = socket.data.device?._id;
            const findDevice = await Device.findOne({ _id });

            const id_suffix = data.key as number > 0 ? `${data.key}` : '';

            console.log("from_device:", data);
            if (!findDevice) return;

            if (data.state !== null || data.state !== undefined) findDevice.state = data.state;
            if (data.value !== null || data.value !== undefined) findDevice.value = data.value;

            if (findDevice.device_type === 'tank_level') {
                // device-sync
                socket.broadcast.to(socket.data.endpoint as string).emit("device_sync", { ...data });
            }

            // sending to ui
            socket.broadcast.to(socket.data.endpoint as string).emit("to_ui", {
                chip_id: `${socket.data.device?.chip_id}-${id_suffix}`,
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
            const findDevice = await Device.findOne({ chip_id: data.chip_id });
            console.log("from_ui:", data);
            if (!findDevice) return;

            const chip_id_key = (data.chip_id as string).split('-');
            const num_keys = chip_id_key.length;

            if (data.state !== null || data.state !== undefined) findDevice.state = data.state;
            if (data.value !== null || data.value !== undefined) findDevice.value = data.value;

            // sending to device
            socket.broadcast.to(socket.data.endpoint as string).emit("to_device", {
                key: (num_keys > 1) ? (chip_id_key[1] as unknown as number) : 0,
                state: data.state,
                value: data.value
            });

            // ui-sync
            socket.broadcast.to(socket.data.endpoint as string).emit("ui_sync", { ...data });

            await findDevice.save();
        } catch (error) {
            console.log(error as string);
        }
    };
};
