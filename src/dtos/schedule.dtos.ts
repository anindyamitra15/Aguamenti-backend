import { Types } from "mongoose";
import { ScheduleType } from "../models/schedule.model";
import { TriggerType } from "../models/schedule.model";
import { WeekDay } from "../models/schedule.model";

export interface CreateScheduleDto {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_on?: [WeekDay],
    end_at: Date,
    user_id : Types.ObjectId,
};

export interface ListScheduleUnderUserDto {
    user_id : Types.ObjectId,
};

export interface ListScheduleUnderDeviceDto {
    chip_id: string,
};
export interface ListScheduleUnderLinkedDeviceDto {
    linked_chip_id: string,
};

export interface DeleteScheduleDto {
    name : string,
    chip_id : string,
    user_id: Types.ObjectId,
};

export interface EditScheduleDto {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    repeat_on?: [WeekDay],
    end_at: Date,
    user_id : Types.ObjectId,
};

