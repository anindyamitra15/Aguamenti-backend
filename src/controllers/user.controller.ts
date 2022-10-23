import { Request, Response } from "express";
import generateResponse from "../httpresponsecreater";

export const Register = async (req: Request, res: Response) => {
    return generateResponse(res);
};
export const Login = async (req: Request, res: Response) => {
    return generateResponse(res);
};
export const EmailExists = async (req: Request, res: Response) => {
    return generateResponse(res);
    // res.status(200).json({message: "OK"});
};