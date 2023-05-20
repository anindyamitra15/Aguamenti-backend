import { Request, Response } from "express";
import { Types } from "mongoose";
import { ChangeHouseDto, CreateDeviceDto, HouseSnapshotDto, LinkPumpDto, LoginDto, UpdateDeviceDto } from "../dtos/device.dtos";
import generateResponse from "../httpresponsecreater";
import { DeviceType } from "../models/device.model";
import * as DeviceService from "../services/device.service";

export const Create = async (req: Request, res: Response) => {
    const data: CreateDeviceDto = {
        owner_id: req.body.user._id,
        name: String(req.body.name),
        chip_id: String(req.body.chip_id),
        device_type: req.body.device_type as DeviceType,
        linked_chip_id: String(req.body.linked_chip_id),
        house_id: req.body.house_id,
    };
    if (!data.name || !data.chip_id || !data.device_type)
        return generateResponse(res, 400);
    // if (data.device_type === 'tank_level' && !data.linked_chip_id)
    //     return generateResponse(res, 400);
    const { code, message, result } = await DeviceService.Create(data);
    return generateResponse(res, code, message, result);
};


export const Login = async (req: Request, res: Response) => {
    const data: LoginDto = {
        chip_id: String(req.params["chip_id"])
    };

    if (!data.chip_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.Login(data);;
    return generateResponse(res, code, message, result);
};


export const UpdateDevice = async (req: Request, res: Response) => {
    const data: UpdateDeviceDto = {
        name: req.body.name,
        chip_id: req.body.chip_id,
        device_type: req.body.device_type as DeviceType,
        house_id: req.body.house_id,
        owner_id: req.body.user._id
    };
    if (!data.chip_id || (!data.name && !data.house_id && !data.device_type))
        return generateResponse(res, 400);
    const { code, message, result } = await DeviceService.UpdateDevice(data);
    return generateResponse(res, code, message, result);
};


export const HouseSnapshot = async (req: Request, res: Response) => {
    const data: HouseSnapshotDto = {
        user_id: req.body.user._id,
        house_id: req.params["house_id"],
    };
    if (!data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.HouseSnapshot(data);
    return generateResponse(res, code, message, result);
};


export const ChangeHouse = async (req: Request, res: Response) => {
    const data: ChangeHouseDto = {
        owner_id: req.body.user._id,
        house_id: req.body.house_id,
        device_id: req.body.device_id as Types.ObjectId,
        chip_id: req.body.chip_id as string,
    };

    if (!data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.ChangeHouse(data);
    return generateResponse(res, code, message, result);
};

// export const LinkPump = async (req: Request, res: Response) => {
//     const data: LinkPumpDto = {
//         owner_id: req.body.user._id,
//         house_id: req.body.house_id,
//         chip_id: String(req.body.chip_id),
//         linked_chip_id: String(req.body.linked_chip_id)
//     };

//     if (!data.house_id || !data.chip_id || !data.linked_chip_id) return generateResponse(res, 400);

//     const { code, message, result } = await DeviceService.LinkPump(data);
//     return generateResponse(res, code, result, message);
// };
