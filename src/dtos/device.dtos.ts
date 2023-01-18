import { Types } from "mongoose";
import { DeviceType } from "../models/device.model";

export interface CreateDeviceDto {
    owner_id: Types.ObjectId,
    name: string,
    chip_id: string,
    device_type: DeviceType,
    house_id?: Types.ObjectId,
    linked_chip_id?: string
};


export interface LoginDto {
    chip_id: string
};


export interface UpdateDeviceDto {
    name?: string,
    chip_id?: string,
    device_type?: DeviceType,
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

export interface LinkPumpDto {
    owner_id: Types.ObjectId,
    chip_id: string,
    house_id: Types.ObjectId,
    linked_chip_id: string
};