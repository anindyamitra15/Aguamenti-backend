import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto, DeleteScheduleDto, EditScheduleDto, ListScheduleDto } from "../dtos/schedule.dtos";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
export const ListSchedule = async (schedule: ListScheduleDto): Promise<GenericResponse> => {
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