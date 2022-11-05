import { Types } from "mongoose";

export interface CreateDeviceDto {
    name: string,
    chip_id: string,
    house_id: Types.ObjectId,
    owner_id: Types.ObjectId,
};


export interface LoginDto {
    chip_id: string
};


export interface UpdateDeviceDto {
    name?: string,
    chip_id?: string,
    house_id?: Types.ObjectId,
    owner_id: Types.ObjectId
};


export interface HouseSnapshotDto {
    house_id?: string,
    user_id: Types.ObjectId,
};


export interface ChangeHouseDto {
    owner_id: Types.ObjectId,
    house_id?: Types.ObjectId,
    device_id?: Types.ObjectId,
    chip_id?: string
};
