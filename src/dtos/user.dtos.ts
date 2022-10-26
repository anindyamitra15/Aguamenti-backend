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

export interface UserChngPassDto{
    old_pass: string,
    new_pass: string,
    email: string,
    _id: string
}
