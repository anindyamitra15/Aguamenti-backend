import { Document, Model, model, Schema, Types } from "mongoose";

export type ScheduleType = "on" | "off" | "dim" | "and" | "or";
export const ScheduleTypes: string[] = ["on", "off", "dim", "and", "or"];

export type TriggerType = "timing" | "action";
export const TriggerTypes: string[] = ["timing", "action"];


export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const WeekDayList = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const WeekDays: { [key: number]: WeekDay } = Object.freeze({
    0: 'mon',
    1: 'tue',
    2: 'wed',
    3: 'thu',
    4: 'fri',
    5: 'sat',
    6: 'sun'
});

interface ScheduleInterface extends Document {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_on?: [WeekDay],
    end_at: Date,    //js built-in date class
};


const ScheduleSchema: Schema<ScheduleInterface> = new Schema(
    {
        name: { type: String, required: true },
        chip_id: { type: String, required: true },
        linked_chip_id: { type: String },
        schedule_type: { type: String, enum: ScheduleTypes },
        trigger_type: { type: String, enum: TriggerTypes, default: String(TriggerTypes[0]) },
        repeat_on: { type: [String], enum: WeekDays },
        end_at: { type: Date }
    },
    {
        timestamps: true
    }
);

ScheduleSchema.pre<ScheduleInterface>("save", function (next) {
    if (
        this.isNew ||
        this.isModified("schedule_type") ||
        this.isModified("trigger_type") ||
        this.isModified("repeat_on") ||
        this.isModified("end_at")
    ){
        //function to convert readable time data to cron string
        next();
    }
    else
        next();
});


const Schedule: Model<ScheduleInterface> = model("Schedule", ScheduleSchema);

export default Schedule;
