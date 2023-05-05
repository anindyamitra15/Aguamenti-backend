import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleUnderDeviceDto, ListScheduleUnderLinkedDeviceDto, ListScheduleUnderUserDto, } from "../dtos/schedule.dtos";
import Device from "../models/device.model";
import Schedule from "../models/schedule.model";
import User from "../models/user.model";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: schedule.user_id });
        const findDevice = await Device.findOne({ chip_id: schedule.chip_id });
        const findSchedule = await Schedule.findOne({ name: schedule.name });
        if (findSchedule) return { code: 400, message: "Schedule Exists" };

        if (!schedule.name) return { code: 400, message: "Schedule Name Required" };
        if (!schedule.chip_id) return { code: 400, message: "Schedule Device ID Required" };
        if (!schedule.trigger_type) return { code: 400, message: "Schedule Trigger Type Required" };
        if (!schedule.end_at) return { code: 400, message: "Schedule End Date Required" };

        const newSchedule = new Schedule({ ...schedule });
        findUser?.schedule_ids?.push(newSchedule._id);
        findDevice?.schedule_ids?.push(newSchedule._id);
        await findDevice?.save();
        await findUser?.save();
        await newSchedule.save();

        return { code: 200, result: { schedule_id: newSchedule._id }, message: "Schedule created" };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const ListScheduleUnderUser = async (schedule: ListScheduleUnderUserDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: schedule.user_id }, { password: 0 }).populate('schedule_ids');
        if (!findUser) return { code: 404, message: "User doesn't exist and this block isn't triggered as well :)" };
        return { code: 200, result: findUser.schedule_ids, message: `Here are the schedules for user: ${findUser.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderDevice = async (schedule: ListScheduleUnderDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: schedule.chip_id }, { password: 0 }).populate('schedule_ids');
        if (!findDevice) return { code: 404, message: "Device doesn't exist and this block isn't triggered as well :)" };
        return { code: 200, result: findDevice.schedule_ids, message: `Here are the schedules for the device: ${findDevice.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderLinkedDevice = async (schedule: ListScheduleUnderLinkedDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: schedule.linked_chip_id }, { password: 0 }).populate('schedule_ids');
        if (!findDevice) return { code: 404, message: "Device doesn't exist and this block isn't triggered as well :)" };
        return { code: 200, result: findDevice.schedule_ids, message: `Here are the schedules for the linked device: ${findDevice.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const DeleteSchedule = async (schedule: DeleteScheduleDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: schedule.user_id });
        const findSchedule = await Schedule.findOne({ $or: [{ name: schedule.name }, { _id: schedule._id }] });
        if (!findUser || !findSchedule) return { code: 400, message: "No permission or schedule doesn't exist" };
        const findDevice = await Device.findOne({ chip_id: findSchedule.chip_id });
        const findLinkedDevice = await Device.findOne({ chip_id: findSchedule.linked_chip_id })
        const index_user: number | null = findUser?.schedule_ids?.indexOf(findSchedule._id) as number;
        if (index_user > -1) {
            findUser?.schedule_ids?.splice(index_user, 1);
            await findUser?.save();
        }
        const index_device: number | null = findDevice?.schedule_ids?.indexOf(findSchedule._id) as number;
        if (index_device > -1) {
            findDevice?.schedule_ids?.splice(index_device, 1);
            await findDevice?.save();
        }
        const index_linked_device: number | null = findLinkedDevice?.schedule_ids?.indexOf(findSchedule._id) as number;
        if (index_linked_device > -1) {
            findLinkedDevice?.schedule_ids?.splice(index_linked_device, 1);
            await findLinkedDevice?.save();
        }
        await findSchedule.delete();
        return { code: 200, message: "Schedule Deleted" };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const EditSchedule = async (schedule: EditScheduleDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: schedule.user_id });
        if (!findUser) return { code: 404, message: "Permission Denied" };
        const findSchedule = await Schedule.findOne({ $or: [{ name: schedule.name }, { _id: schedule._id }] });
        if (!findSchedule) return { code: 404, message: "No such schedule" };

        if (schedule.name) findSchedule.name = schedule.name;
        if (schedule.chip_id) findSchedule.chip_id = schedule.chip_id;
        if (schedule.linked_chip_id) findSchedule.linked_chip_id = schedule.linked_chip_id;
        if (schedule.schedule_type) findSchedule.schedule_type = schedule.schedule_type;
        if (schedule.repeat_on) findSchedule.repeat_on = schedule.repeat_on;
        if (schedule.end_at) findSchedule.end_at = schedule.end_at;

        await findSchedule.save();
        return { code: 200, result: { ...schedule } };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};