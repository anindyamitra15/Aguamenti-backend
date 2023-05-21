import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleUnderDeviceDto, ListScheduleUnderLinkedDeviceDto, ListScheduleUnderUserDto, } from "../dtos/schedule.dtos";
import Device from "../models/device.model";
import Schedule from "../models/schedule.model";
import User from "../models/user.model";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
        const findSchedule = await Schedule.findOne({ name: schedule.name, owner_id: schedule.owner_id });

        if (findSchedule) return { code: 400, message: "Schedule Exists" };


        const newSchedule = new Schedule({ ...schedule });

        const findUser = await User.findOne({ _id: schedule.owner_id });

        const findDevice = await Device.findOne({ chip_id: schedule.linked_chip_id });
        if (!findDevice) return { code: 404, message: "Device not found" };

        findUser?.schedule_ids?.push(newSchedule._id);
        findDevice.schedule_ids?.push(newSchedule._id);

        await findDevice.save();
        await findUser?.save();
        await newSchedule.save();

        return { code: 200, result: { schedule: newSchedule }, message: "Schedule created" };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const ListScheduleUnderUser = async (schedule: ListScheduleUnderUserDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: schedule.user_id }).populate('schedule_ids');
        if (!findUser) return { code: 404, message: "User doesn't exist" };
        return { code: 200, result: { schedules: findUser.schedule_ids }, message: `Here are the schedules for user: ${findUser.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderDevice = async (schedule: ListScheduleUnderDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: schedule.chip_id });
        if (!findDevice) return { code: 404, message: "Device not found" };

        const findSchedules = await Schedule.find({ chip_id: schedule.chip_id });
        return { code: 200, result: { schedules: findSchedules }, message: `Here are the schedules for the device: ${findDevice.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderLinkedDevice = async (schedule: ListScheduleUnderLinkedDeviceDto): Promise<GenericResponse> => {
    try {
        const findDevice = await Device.findOne({ chip_id: schedule.linked_chip_id }).populate("schedule_ids");
        if (!findDevice) return { code: 404, message: "Device not found" };

        return { code: 200, result: { schedules: [...findDevice.schedule_ids as Array<any>] }, message: `Here are the schedules for the linked device: ${findDevice.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const DeleteSchedule = async (schedule: DeleteScheduleDto): Promise<GenericResponse> => {
    try {
        const findSchedule = await Schedule.findOne({ $or: [{ name: schedule.name }, { _id: schedule._id }] });
        if (!findSchedule) return { code: 400, message: "No permission or schedule doesn't exist" };


        const findUser = await User.findOne({ _id: schedule.user_id });
        const index_user: number | null = findUser?.schedule_ids?.indexOf(findSchedule._id) as number;
        if (index_user > -1) {
            findUser?.schedule_ids?.splice(index_user, 1);
            await findUser?.save();
        }

        const findLinkedDevice = await Device.findOne({ chip_id: findSchedule.linked_chip_id });
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
        const findSchedule = await Schedule.findOne({ _id: schedule._id });
        if (!findSchedule) return { code: 404, message: "No such schedule" };

        if (schedule.name) findSchedule.name = schedule.name;
        if (schedule.chip_id != undefined) {
            const findDevice = await Device.findOne({ chip_id: findSchedule.chip_id });
            if (findDevice)
                findSchedule.chip_id = findDevice.chip_id;

        }
        if (schedule.linked_chip_id) {
            const findDevice = await Device.findOne({ chip_id: findSchedule.linked_chip_id });
            if (findDevice) {
                const index_linked_device: number | null = findDevice?.schedule_ids?.indexOf(findSchedule._id) as number;
                if (index_linked_device > -1) {
                    findDevice?.schedule_ids?.splice(index_linked_device, 1);
                    await findDevice?.save();
                }

                findSchedule.linked_chip_id = schedule.linked_chip_id;

                const findNewDevice = await Device.findOne({ chip_id: findSchedule.linked_chip_id });
                findNewDevice?.schedule_ids?.push(findSchedule._id);
                findNewDevice?.save();
            }
        }
        if (schedule.enabled != undefined || schedule.enabled != null) findSchedule.enabled = schedule.enabled;
        if (schedule.schedule_type) findSchedule.schedule_type = schedule.schedule_type;
        if (schedule.threshold_type) findSchedule.threshold_type = schedule.threshold_type;
        if (schedule.threshold_value != null || schedule.threshold_value != undefined)
            findSchedule.threshold_value = schedule.threshold_value;
        if (schedule.repeat_time) findSchedule.repeat_time = schedule.repeat_time;
        if (schedule.repeat_on) findSchedule.repeat_on = schedule.repeat_on;
        if (schedule.end_at) findSchedule.end_at = schedule.end_at;

        await findSchedule.save();

        return { code: 200, result: { schedule: findSchedule } };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};