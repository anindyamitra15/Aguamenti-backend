import { Request, Response } from "express";
import { UserRegisterDto } from "../dtos/user.dtos";
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
    return generateResponse(res);
};

export const ChangePassword = async (req: Request, res: Response) => {
    return generateResponse(res);
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