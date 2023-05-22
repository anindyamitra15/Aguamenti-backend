import { Request, Response } from "express";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleUnderDeviceDto, ListScheduleUnderLinkedDeviceDto, ListScheduleUnderUserDto } from "../dtos/schedule.dtos";
import generateResponse from "../httpresponsecreater";
import { ScheduleType, ThresholdType } from "../models/schedule.model";
import { TriggerType } from "../models/schedule.model";
import { WeekDay } from "../models/schedule.model";
import * as ScheduleService from "../services/schedule.service";

export const CreateSchedule = async (req: Request, res: Response) => {
    const schedule: CreateScheduleDto = {
        owner_id: req.body.user._id,
        threshold_value: req.body.threshold_value,
        threshold_type: req.body.threshold_type as ThresholdType,
        name: req.body.name,
        chip_id: req.body.chip_id,
        linked_chip_id: req.body.linked_chip_id,
        schedule_type: req.body.schedule_type as ScheduleType,
        trigger_type: req.body.trigger_type as TriggerType,
        repeat_time: req.body.repeat_time as Date,
        repeat_on: req.body.repeat_on as [WeekDay],
        end_at: req.body.end_at as Date,
    };
    if (!schedule.owner_id)
        return generateResponse(res, 400, "ID required");
    if (!schedule.name)
        return generateResponse(res, 400, "Schedule Name Required");
    if (!schedule.linked_chip_id)
        return generateResponse(res, 400, "Linked Chip ID Required");
    if (!schedule.schedule_type)
        return generateResponse(res, 400, "Schedule Type not provided");
    if (!schedule.trigger_type)
        return generateResponse(res, 400, "Schedule Trigger Type Required");
    if ((schedule.trigger_type == 'action')
        && (schedule.threshold_value == null ||
            schedule.threshold_value == undefined ||
            !schedule.threshold_type))
        return generateResponse(res, 400, "Threshold Value and Type not provided for action type schedule");


    if (schedule.trigger_type == "timing" && !schedule.repeat_time)
        return generateResponse(res, 400, "Schedule Repeating Date/Time Required");

    const { code, message, result } = await ScheduleService.CreateSchedule(schedule);
    return generateResponse(res, code, message, result);
};

export const ListScheduleUnderUser = async (req: Request, res: Response) => {
    const schedule: ListScheduleUnderUserDto = {
        user_id: req.body.user._id,
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUnderUser(schedule);
    return generateResponse(res, code, message, result);
};

export const ListScheduleUnderDevice = async (req: Request, res: Response) => {
    const schedule: ListScheduleUnderDeviceDto = {
        chip_id: req.params.chip_id,
    };
    if (!schedule.chip_id)
        return generateResponse(res, 400, "Chip ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUnderDevice(schedule);
    return generateResponse(res, code, message, result);
};

export const ListScheduleUnderLinkedDevice = async (req: Request, res: Response) => {
    const schedule: ListScheduleUnderLinkedDeviceDto = {
        linked_chip_id: req.params.linked_chip_id,
    };
    if (!schedule.linked_chip_id)
        return generateResponse(res, 400, "Linked Chip ID required");
    const { code, message, result } = await ScheduleService.ListScheduleUnderLinkedDevice(schedule);
    return generateResponse(res, code, message, result);
};

export const DeleteSchedule = async (req: Request, res: Response) => {
    const schedule: DeleteScheduleDto = {
        user_id: req.body.user._id,
        _id: req.body._id,
        name: req.body.name,
    }
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.DeleteSchedule(schedule);
    return generateResponse(res, code, message, result);
};

export const EditSchedule = async (req: Request, res: Response) => {
    const schedule: EditScheduleDto = {
        _id: req.body._id,
        user_id: req.body.user._id,
        enabled: req.body.enabled,
        threshold_value: req.body.threshold_value,
        threshold_type: req.body.threshold_type as ThresholdType,
        name: req.body.name,
        chip_id: req.body.chip_id,
        linked_chip_id: req.body.linked_chip_id,
        schedule_type: req.body.schedule_type as ScheduleType,
        repeat_time: req.body.repeat_time as Date,
        repeat_on: req.body.repeat_on as [WeekDay],
        end_at: req.body.end_at as Date,
    };
    if (!schedule.user_id)
        return generateResponse(res, 400, "ID required");
    const { code, message, result } = await ScheduleService.EditSchedule(schedule);
    return generateResponse(res, code, message, result);
};