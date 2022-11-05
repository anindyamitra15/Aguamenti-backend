import { Request, Response } from "express";
import { AllHousesDto, UserChngPassDto, UserLoginDto, UserRegisterDto } from "../dtos/user.dtos";
import generateResponse from "../httpresponsecreater";
import * as UserServices from '../services/user.service';

export const Register = async (req: Request, res: Response) => {
    const user: UserRegisterDto = { ...req.body };
    if (!user.email || !user.name || !user.password)
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.Register(user);
    return generateResponse(res, code, result, message);
};

export const Login = async (req: Request, res: Response) => {
    const user: UserLoginDto = { ...req.body };
    if (!user.email)
        return generateResponse(res, 400);
    const { code, message, result } = await UserServices.Login(user);
    return generateResponse(res, code, result, message);
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
    return generateResponse(res, code, result, message);
};

export const AddHouse = async (req: Request, res: Response) => {
    return generateResponse(res);
};

export const RemoveHouse = async (req: Request, res: Response) => {
    return generateResponse(res);
};

export const EmailExists = async (req: Request, res: Response) => {
    return generateResponse(res);
};

export const AllHouses = async (req: Request, res: Response) => {
    const data: AllHousesDto = {
        user_id: req.body.user._id
    };
    const {code, message, result} = await UserServices.AllHouses(data);
    return generateResponse(res, code, result, message);
};