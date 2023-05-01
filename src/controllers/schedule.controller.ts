import { Request, Response } from "express";
import { Types } from "mongoose";
import { CreateScheduleDto, ListScheduleUsingUserIDDto, ListScheduleUsingDeviceIDDto, ListScheduleUsingLinkedDeviceIDDto, DeleteScheduleDto, EditScheduleDto } from "../dtos/schedule.dtos";
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

export const ListScheduleUsingUserID = async (req: Request, res: Response) => {
    const schedule: ListScheduleUsingUserIDDto = {
        user_id: req.body.user._id,
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUsingUserID(schedule);
    return generateResponse(res, code, result, message);
};

export const ListScheduleUsingDeviceID = async (req: Request, res: Response) => {
    const schedule: ListScheduleUsingDeviceIDDto = {
        chip_id: String(req.body.chip_id),
    };
    if (!schedule.chip_id)
        return generateResponse(res, 400, "Chip ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUsingDeviceID(schedule);
    return generateResponse(res, code, result, message);
};

export const ListScheduleUsingLinkedDeviceID = async (req: Request, res: Response) => {
    const schedule: ListScheduleUsingLinkedDeviceIDDto = {
        linked_chip_id: String(req.body.linked_chip_id),
    };
    if (!schedule.linked_chip_id)
        return generateResponse(res, 400, "Linked Chip ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUsingLinkedDeviceID(schedule);
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