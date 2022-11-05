import { Request, Response } from "express";
import { ChangeOwnerDto, CreateHouseDto, DeleteHouseDto, UpdateHouseDto, UpdateUserHouseDto } from "../dtos/house.dtos";
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
export const AddDevice = async (req: Request, res: Response) => { };
export const RemoveDevice = async (req: Request, res: Response) => { };

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