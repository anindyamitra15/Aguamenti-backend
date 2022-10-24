import { Types } from "mongoose";

export interface CreateHouseDto {
    name: string,
    owner_id: Types.ObjectId
};

export interface DeleteHouseDto {
    _id: Types.ObjectId,
    owner_id: Types.ObjectId
};