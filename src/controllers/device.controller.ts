import { Request, Response } from "express";
import { ChangeHouseDto, CreateDeviceDto, HouseSnapshotDto, LoginDto, UpdateDeviceDto } from "../dtos/device.dtos";
import generateResponse from "../httpresponsecreater";
import * as DeviceService from "../services/device.service";

export const Create = async (req: Request, res: Response) => {
    const data: CreateDeviceDto = {
        owner_id: req.body.user._id,
        name: String(req.body.name),
        chip_id: String(req.body.chip_id),
        house_id: req.body.house_id,
    };
    if (!data.name || !data.chip_id || !data.house_id)
        return generateResponse(res, 400);
    const { code, message, result } = await DeviceService.Create(data);
    return generateResponse(res, code, result, message);
};


export const Login = async (req: Request, res: Response) => {
    const data: LoginDto = {
        chip_id: String(req.params["chip_id"])
    };

    if (!data.chip_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.Login(data);;
    return generateResponse(res, code, result, message);
};


export const UpdateDevice = async (req: Request, res: Response) => {
    const data: UpdateDeviceDto = {
        name: req.body.name,
        chip_id: req.body.chip_id,
        house_id: req.body.house_id,
        owner_id: req.body.user._id
    };
    if (!data.chip_id || (!data.name && !data.house_id))
        return generateResponse(res, 400);
    const { code, message, result } = await DeviceService.UpdateDevice(data);
    return generateResponse(res, code, result, message);
};


export const HouseSnapshot = async (req: Request, res: Response) => {
    const data: HouseSnapshotDto = {
        house_id: req.body.house_id,
        user_id: req.body.user._id
    };
    if (!data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.HouseSnapshot(data);
    return generateResponse(res, code, result, message);
};


export const ChangeHouse = async (req: Request, res: Response) => {
    const data: ChangeHouseDto = {
        owner_id: req.body.user._id,
        house_id: req.body.house_id
    };

    if (!data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await DeviceService.ChangeHouse(data);
    return generateResponse(res, code, result, message);
};
