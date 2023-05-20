import { Request, Response } from "express";
import { AddHouseDto, AllHousesDto, RemoveHouseDto, UserChngPassDto, UserLoginDto, UserRegisterDto } from "../dtos/user.dtos";
import generateResponse from "../httpresponsecreater";
import * as UserServices from '../services/user.service';

export const Register = async (req: Request, res: Response) => {
    const user: UserRegisterDto = { ...req.body };
    if (!user.email || !user.name || !user.password)
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.Register(user);
    return generateResponse(res, code, message, result);
};

export const Login = async (req: Request, res: Response) => {
    const user: UserLoginDto = { ...req.body };
    if (!user.email)
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.Login(user);
    return generateResponse(res, code, message, result);
};

export const ChangePassword = async (req: Request, res: Response) => {
    const user: UserChngPassDto = {
        _id: req.body.user._id,
        old_pass: req.body.old_pass,
        new_pass: req.body.new_pass,
        email: req.body.email
    };
    if (!user._id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await UserServices.ChangePassword(user);
    return generateResponse(res, code, message, result);
};

export const AddHouse = async (req: Request, res: Response) => {
    const data: AddHouseDto = {
        owner_id: req.body.user._id,
        house_id: req.body.house_id,
        user_id: req.body.user_id,
        email: req.body.email
    };
    if (!data.house_id || (!data.user_id && !data.email))
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.AddHouse(data);
    return generateResponse(res, code, message, result);
};

export const RemoveHouse = async (req: Request, res: Response) => {
    const data: RemoveHouseDto = {
        owner_id: req.body.user._id,
        house_id: req.body.house_id,
        user_id: req.body.user_id,
        email: req.body.email
    };
    if (!data.house_id || (!data.user_id && !data.email))
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.RemoveHouse(data);
    return generateResponse(res, code, message, result);
};

export const EmailExists = async (req: Request, res: Response) => {
    return generateResponse(res);
};

export const AllHouses = async (req: Request, res: Response) => {
    const data: AllHousesDto = {
        user_id: req.body.user._id
    };
    const { code, message, result } = await UserServices.AllHouses(data);
    return generateResponse(res, code, message, result);
};