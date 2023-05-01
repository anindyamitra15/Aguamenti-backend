import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleUnderDeviceDto, ListScheduleUnderLinkedDeviceDto, ListScheduleUnderUserDto, } from "../dtos/schedule.dtos";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
        
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const ListScheduleUnderUser = async (schedule: ListScheduleUnderUserDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderDevice = async (schedule: ListScheduleUnderDeviceDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUnderLinkedDevice = async (schedule: ListScheduleUnderLinkedDeviceDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const DeleteSchedule = async (schedule: DeleteScheduleDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const EditSchedule = async (schedule: EditScheduleDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};