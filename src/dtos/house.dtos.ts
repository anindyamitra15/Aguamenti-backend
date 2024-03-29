import { Types } from "mongoose";

export interface CreateHouseDto {
    name: string,
    owner_id: Types.ObjectId
};

export interface HouseDetailsDto {
    house_id: Types.ObjectId,
    user_id: Types.ObjectId
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

export interface UpdateUserHouseDto {
    user_id?: Types.ObjectId,
    house_id?: Types.ObjectId,
    owner_id: Types.ObjectId
};

export interface AddDeviceToHouseDto {
    device_id?: Types.ObjectId,
    chip_id?: string,
    existing_house_ids?: [Types.ObjectId],
    house_id?: Types.ObjectId,
    owner_id: Types.ObjectId
};

export interface RemoveDeviceFromHouseDto {
    device_id?: Types.ObjectId,
    chip_id?: string,
    existing_house_ids?: [Types.ObjectId],
    owner_id: Types.ObjectId
};