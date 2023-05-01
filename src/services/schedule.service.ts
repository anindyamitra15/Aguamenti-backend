import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleUsingDeviceIDDto, ListScheduleUsingLinkedDeviceIDDto, ListScheduleUsingUserIDDto } from "../dtos/schedule.dtos";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
        
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const ListScheduleUsingUserID = async (schedule: ListScheduleUsingUserIDDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUsingDeviceID = async (schedule: ListScheduleUsingDeviceIDDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ListScheduleUsingLinkedDeviceID = async (schedule: ListScheduleUsingLinkedDeviceIDDto): Promise<GenericResponse> => {
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