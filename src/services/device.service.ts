import { ChangeHouseDto, CreateDeviceDto, HouseSnapshotDto, LinkPumpDto, LoginDto, UpdateDeviceDto } from "../dtos/device.dtos";
import { GenericResponse } from "../dtos/response.dtos";
import Device from "../models/device.model";
import House from "../models/house.model";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../envparser";
import User from "../models/user.model";
import { Types } from "mongoose";

export const Create = async (data: CreateDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: data.chip_id });
        if (findDevice) return { code: 202, message: "Device with that id already exists" };
        
        if (data.house_id !== undefined || data.house_id !== null) {
            const findHouse = await House.findOne({ _id: data.house_id, owner_id: data.owner_id });
            if (!findHouse) return { code: 403, message: "House doesn't exist or you're not the owner" };
        }
        // if the device is not of type tank_level or if a pump_chip_id is not provided
        if (data.device_type !== 'tank_level' || !data.pump_chip_id) {
            const newDevice = new Device({
                name: data.name,
                chip_id: data.chip_id,
                house_id: data.house_id,
                device_type: data.device_type,
            });
            await newDevice.save();
            return { code: 201, result: { device_id: newDevice._id }, message: "Device created!" };
        }

        const findPump = await Device.findOne({ chip_id: data.pump_chip_id });
        // validate that chip's existence in the db
        if (!findPump) return { code: 404, message: "Pump doesn't exist, device creation failed" };

        const newDevice = new Device({
            name: data.name,
            chip_id: data.chip_id,
            house_id: data.house_id,
            device_type: data.device_type,
            pump_chip_id: findPump.chip_id
        });
        await newDevice.save();
        return { code: 201, result: { device_id: newDevice._id }, message: `Tank unit created and linked with Pump ${findPump.name}!` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};


export const Login = async (data: LoginDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: data.chip_id }).populate('house_id');
        if (!findDevice) return { code: 404, message: "No such device" };

        const house: {
            endpoint?: string
        } = findDevice.house_id as any;

        const token = jwt.sign({
            device_id: findDevice._id,
            chip_id: findDevice.chip_id
            // TODO: add/remove things from the token as needed
        }, jwt_secret);

        return { code: 200, result: { endpoint: house.endpoint, token } };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};


export const UpdateDevice = async (data: UpdateDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: data.chip_id });
        if (!findDevice) return { code: 404, message: "No such device" };

        const oldHouse = await House.findOne({ house_id: findDevice.house_id, owner_id: data.owner_id });
        if (!oldHouse) return { code: 403, message: "No permission for the previous house" };

        let updateLog: string = "Device updated";
        let house = oldHouse.name;

        if (data.name) findDevice.name = data.name;
        if (data.chip_id) findDevice.chip_id = data.chip_id;
        if (data.device_type) findDevice.device_type = data.device_type;
        if (data.house_id) {
            const findHouse = await House.findOne({ _id: data.house_id, owner_id: data.owner_id });
            if (findHouse) {
                findDevice.house_id = data.house_id;
                house = findHouse.name;
            }
            else updateLog += " but no permission for the new house or house inexistent";
        }

        await findDevice.save();
        return {
            code: 200, result: {
                name: data.name,
                device_id: findDevice._id,
                house,
                device_type: findDevice.device_type
            }, message: updateLog
        };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};


export const HouseSnapshot = async (data: HouseSnapshotDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: data.user_id, house_ids: data.house_id });
        if (!findUser) return { code: 403, message: "Insufficient permissions" };
        const findDevices = await Device.find({ house_id: data.house_id });
        return { code: 200, result: { devices: [...findDevices] }, message: `All devices for ${findUser.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};


export const ChangeHouse = async (data: ChangeHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({ owner_id: data.owner_id, _id: data.house_id });
        if (!findHouse) return { code: 403, message: "Insufficient permission or invalid house id provided" };

        const findDevice = await Device.findOne({
            $or: [
                { _id: data.device_id },
                { chip_id: data.chip_id }
            ]
        });
        if (!findDevice) return { code: 404, message: "Device not found" };

        const previous_house_id = findDevice.house_id;
        if (data.house_id) {
            const previousHouse = await House.findOne({ _id: previous_house_id, owner_id: data.owner_id });
            if (!previousHouse) return { code: 403, message: "No permission for the previous house" };
            findDevice.house_id = data.house_id;
            await findDevice.save();
        }

        return { code: 200, result: { previous_house_id, new_house_id: findDevice.house_id }, message: `Moved device ${findDevice.name} to new House` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const LinkPump = async (data: LinkPumpDto): Promise<GenericResponse> => {
    try {
        const findTankUnit = await Device.findOne({
            chip_id: data.chip_id,
            device_type: "tank_level",
            house_id: data.house_id
        });
        if (!findTankUnit) return { code: 403, message: "Tank unit inexistent or no permission" };
        const findPump = await Device.findOne({
            chip_id: data.pump_chip_id,
            device_type: "pump",
            house_id: data.house_id
        });
        if (!findPump) return { code: 403, message: "Pump controller inexistent or no permission" };

        findTankUnit.pump_chip_id = findPump.chip_id;

        await findTankUnit.save();

        return { code: 200, message: `${findTankUnit.name} linked with ${findPump.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};