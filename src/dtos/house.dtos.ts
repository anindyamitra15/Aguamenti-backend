import { Types } from "mongoose";

export interface CreateHouseDto {
    name: string,
    owner_id: Types.ObjectId
};

export interface DeleteHouseDto {
    _id: Types.ObjectId,
    owner_id: Types.ObjectId
};

export interface UpdateHouseDto {
    _id: Types.ObjectId,
    name: string,
    owner_id: Types.ObjectId
};

export interface ChangeOwnerDto {
    new_owner_id: Types.ObjectId,
    owner_id: Types.ObjectId,
    _id: Types.ObjectId
};