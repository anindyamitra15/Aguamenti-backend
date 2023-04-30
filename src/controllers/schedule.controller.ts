import { Request, Response } from "express";
import { Types } from "mongoose";
import { CreateScheduleDto, ListScheduleDto, DeleteScheduleDto, EditScheduleDto } from "../dtos/schedule.dtos";
import generateResponse from "../httpresponsecreater";
import { ScheduleType } from "../models/schedule.model";
import { TriggerType } from "../models/schedule.model";
import { WeekDay } from "../models/schedule.model";
import * as ScheduleService from "../services/schedule.service";

export const CreateSchedule = async (req: Request, res: Response) => {
    const schedule: CreateScheduleDto = {
        user_id: req.body.user._id,
        name: String(req.body.name),
        chip_id: String(req.body.chip_id),
        linked_chip_id: req.body.linked_chip_id,
        schedule_type: req.body.schedule_type as ScheduleType,
        trigger_type: req.body.trigger_type as TriggerType,
        repeat_on: req.body.repeat_on as [WeekDay],
        end_at: req.body.end_at as Date,
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.CreateSchedule(schedule);
    return generateResponse(res, code, result, message);
};

export const ListSchedules = async (req: Request, res: Response) => {
    const schedule: ListScheduleDto = {
        user_id: req.body.user._id,
        chip_id: String(req.body.chip_id),
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.ListSchedule(schedule);
    return generateResponse(res, code, result, message);
};

export const DeleteSchedule = async (req: Request, res: Response) => {
    const schedule: DeleteScheduleDto = {
        user_id: req.body.user._id,
        name: String(req.body.name),
        chip_id: String(req.body.chip_id),
    }
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.DeleteSchedule(schedule);
    return generateResponse(res, code, result, message);
};

export const EditSchedule = async (req: Request, res: Response) => {
    const schedule: EditScheduleDto = {
        user_id: req.body.user._id,
        name: String(req.body.name),
        chip_id: String(req.body.chip_id),
        linked_chip_id: req.body.linked_chip_id,
        schedule_type: req.body.schedule_type as ScheduleType,
        repeat_on: req.body.repeat_on as [WeekDay],
        end_at: req.body.end_at as Date,
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.EditSchedule(schedule);
    return generateResponse(res, code, result, message);
};