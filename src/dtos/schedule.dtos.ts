import { Types } from "mongoose";
import { ScheduleType } from "../models/schedule.model";
import { TriggerType } from "../models/schedule.model";
import { WeekDay } from "../models/schedule.model";

export interface CreateSchedule {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_on?: [WeekDay],
    end_at: Date,
    _id : Types.ObjectId,
};

export interface ListSchedule {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_on?: [WeekDay],
    end_at: Date,
};

export interface DeleteSchedule {
    name : string,
    chip_id : string,
    _id: Types.ObjectId,
};

export interface EditSchedule {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_on?: [WeekDay],
    end_at: Date,
    _id : Types.ObjectId,
};

