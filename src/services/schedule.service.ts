import { GenericResponse } from "../dtos/response.dtos";
import { CreateScheduleDto } from "../dtos/schedule.dtos";

export const CreateSchedule = async (schedule: CreateScheduleDto): Promise<GenericResponse> => {
    try {
    
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};