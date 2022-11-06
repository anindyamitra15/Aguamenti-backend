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

export interface UserChngPassDto {
    old_pass: string,
    new_pass: string,
    email: string,
    _id: Types.ObjectId
};

export interface AddHouseDto {
    owner_id: Types.ObjectId,
    house_id?: Types.ObjectId,
    user_id?: Types.ObjectId,
    email?: string
};

export interface RemoveHouseDto {
    owner_id: Types.ObjectId,
    house_id?: Types.ObjectId,
    user_id?: Types.ObjectId,
    email?: string
};

export interface AllHousesDto {
    user_id: Types.ObjectId
};
