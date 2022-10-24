import { Request, Response } from "express";
import { CreateHouseDto, DeleteHouseDto } from "../dtos/house.dtos";
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

    const { code, message, result } = await HouseService.DeleteHouse(house);
    return generateResponse(res, code, result, message);
};
export const UpdateHouse = async (req: Request, res: Response) => { };
export const AddDevice = async (req: Request, res: Response) => { };
export const RemoveDevice = async (req: Request, res: Response) => { };
export const AddUser = async (req: Request, res: Response) => { };
export const RemoveUser = async (req: Request, res: Response) => { };
export const ChangeOwner = async (req: Request, res: Response) => { };