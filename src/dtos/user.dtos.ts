import { Types } from "mongoose";

export interface UserRegisterDto {
    name: string,
    password: string,
    email: string,
    house_id?: [Types.ObjectId]
};

export interface UserLoginDto {
    password: string,
    email: string
};
