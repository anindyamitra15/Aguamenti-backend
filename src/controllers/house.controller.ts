import { Request, Response } from "express";
import { ChangeOwnerDto, CreateHouseDto, DeleteHouseDto, AddDeviceToHouseDto, UpdateHouseDto, UpdateUserHouseDto, RemoveDeviceFromHouseDto, HouseDetailsDto } from "../dtos/house.dtos";
import generateResponse from "../httpresponsecreater";
import * as HouseService from '../services/house.service';

export const CreateHouse = async (req: Request, res: Response) => {
    const house: CreateHouseDto = {
        name: req.body.name,
        owner_id: req.body.user._id
    };
    if (!house.name) return generateResponse(res, 400, null, "Name is required");
    const { code, message, result } = await HouseService.CreateHouse(house);
    return generateResponse(res, code, result, message);
};

export const HouseDetails = async (req: Request, res: Response) => {
    const house: HouseDetailsDto = {
        house_id: req.params["house_id"] as any,
        user_id: req.body.user._id
    };
    if (!house.house_id) return generateResponse(res, 400, null, "House id is required");
    const { code, message, result } = await HouseService.HouseDetails(house);
    return generateResponse(res, code, result, message);
};

export const DeleteHouse = async (req: Request, res: Response) => {
    const house: DeleteHouseDto = {
        _id: req.body.house_id,
        owner_id: req.body.user._id
    };
    if (!house._id) return generateResponse(res, 400, null, "ID is required");
    const { code, message, result } = await HouseService.DeleteHouse(house);
    return generateResponse(res, code, result, message);
};
export const UpdateHouse = async (req: Request, res: Response) => {
    const house: UpdateHouseDto = {
        _id: req.body.house_id,
        name: req.body.name,
        owner_id: req.body.user._id
    };
    if (!house._id || !house.name) return generateResponse(res, 400, null, "Insufficient data");
    const { code, message, result } = await HouseService.UpdateHouse(house);
    return generateResponse(res, code, result, message);
};
export const AddDevice = async (req: Request, res: Response) => {
    const data: AddDeviceToHouseDto = {
        device_id: req.body.device_id,
        chip_id: req.body.chip_id,
        existing_house_ids: req.body.user.house_ids,
        house_id: req.body.house_id,
        owner_id: req.body.user._id
    };

    if ((!data.chip_id && !data.device_id) || !data.house_id)
        return generateResponse(res, 400);
    const { code, message, result } = await HouseService.AddDevice(data);
    return generateResponse(res, code, result, message);
};
export const RemoveDevice = async (req: Request, res: Response) => {
    const data: RemoveDeviceFromHouseDto = {
        device_id: req.body.device_id,
        chip_id: req.body.chip_id,
        existing_house_ids: req.body.user.house_ids,
        owner_id: req.body.user._id
    };

    if (!data.chip_id && !data.device_id)
        return generateResponse(res, 400);
    const { code, message, result } = await HouseService.RemoveDevice(data);
    return generateResponse(res, code, result, message);
};

export const AddUser = async (req: Request, res: Response) => {
    const data: UpdateUserHouseDto = {
        user_id: req.body.user_id,
        house_id: req.body.house_id,
        owner_id: req.body.user._id
    };

    if (!data.user_id || !data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await HouseService.AddUser(data);
    return generateResponse(res, code, result, message);
};
export const RemoveUser = async (req: Request, res: Response) => {
    const data: UpdateUserHouseDto = {
        user_id: req.body.user_id,
        house_id: req.body.house_id,
        owner_id: req.body.user._id
    }

    if (!data.user_id || !data.house_id) return generateResponse(res, 400);

    const { code, message, result } = await HouseService.RemoveUser(data);
    return generateResponse(res, code, result, message);
};
export const ChangeOwner = async (req: Request, res: Response) => {
    const data: ChangeOwnerDto = {
        new_owner_id: req.body.owner_id,
        owner_id: req.body.user._id,
        _id: req.body.house_id
    };

    if (!data.new_owner_id || !data._id) return generateResponse(res, 400, null, "Insufficient data");

    const { code, message, result } = await HouseService.ChangeOwner(data);
    return generateResponse(res, code, result, message);
};