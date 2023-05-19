import { Document, Model, model, Schema, Types } from "mongoose";
import { atMinute, atHour, combine, inMonth, between, onDayOfTheWeek, onDayOfTheMonth } from "node-cron-expression";
export type ScheduleType = "on" | "off" | "dim" | "and" | "or";
export const ScheduleTypes: string[] = ["on", "off", "dim", "and", "or"];

export type TriggerType = "timing" | "action";
export const TriggerTypes: string[] = ["timing", "action"];


export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export const WeekDayList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeekDays: { [key: number]: WeekDay } = Object.freeze({
    0: 'Monday',
    1: 'Tuesday',
    2: 'Wednesday',
    3: 'Thursday',
    4: 'Friday',
    5: 'Saturday',
    6: 'Sunday'
});

interface ScheduleInterface extends Document {
    name: string,
    chip_id: string,
    linked_chip_id?: string,
    schedule_type: ScheduleType,
    trigger_type?: TriggerType,
    repeat_time: Date,
    repeat_on?: [WeekDay],
    end_at: Date,    //js built-in date class
    cron?: string,
};


const ScheduleSchema: Schema<ScheduleInterface> = new Schema(
    {
        name: { type: String, required: true },
        chip_id: { type: String, required: true },
        linked_chip_id: { type: String },
        schedule_type: { type: String, enum: ScheduleTypes },
        trigger_type: { type: String, enum: TriggerTypes, default: String(TriggerTypes[0]) },
        repeat_time: {type : Date},
        repeat_on: { type: [String], enum: WeekDays },
        end_at: { type: Date },
        cron: {type: String}
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
        this.cron = dateToCron(this.repeat_time, this.repeat_on);
        next();
    }
    else
        next();
});

const dateToCron = (date: Date, day?: [WeekDay]) => {

//  ┌────────────── second (optional)
//  │ ┌──────────── minute
//  │ │ ┌────────── hour
//  │ │ │ ┌──────── day of month
//  │ │ │ │ ┌────── month
//  │ │ │ │ │ ┌──── day of week
//  │ │ │ │ │ │
//  │ │ │ │ │ │
//  * * * * * *
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const dayOfMonth = date.getDate()
    const month = date.getMonth()
    const dayOfWeek = day
    const cron_exp = (combine(atMinute(minutes),atHour(hours),inMonth(month+1),onDayOfTheMonth(dayOfMonth),onDayOfTheWeek(dayOfWeek))).toString()
    
    return cron_exp;
};

const Schedule: Model<ScheduleInterface> = model("Schedule", ScheduleSchema);

export default Schedule;
