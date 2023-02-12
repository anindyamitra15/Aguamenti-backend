import { Document, Model, model, Schema, Types } from "mongoose";

export type DeviceType = "switch" | "slider" | "pump" | "tank_level";
export const DeviceTypes: string[] = ["switch", "slider", "pump", "tank_level"];

let device: DeviceType = "switch"

interface DeviceInterface extends Document {
    name: string,
    chip_id: string,
    state?: boolean,
    value?: any, //TODO: check if any restrictions should be applied
    online: boolean,
    schedules: [Schedule]
    house_id?: Types.ObjectId,
    device_type?: DeviceType,
    linked_chip_id?: string
};

const DeviceSchema: Schema<DeviceInterface> = new Schema(
    {
        name: { type: String, required: true },
        chip_id: { type: String, required: true },
        device_type: {
            type: String,
            enum: DeviceTypes,
            default: "switch"
        },
        state: { type: Boolean },
        value: { type: Schema.Types.Mixed },
        house_id: { type: Schema.Types.ObjectId, ref: 'House' },
        linked_chip_id: { type: String }
    },
    {
        timestamps: true
    }
);


const Device: Model<DeviceInterface> = model("Device", DeviceSchema);

export interface Schedule{
    schedule_type: ScheduleType,
    trigger_type: TriggerType,
    repeat_on: [WeekDay],
    end_at: Date    //js built-in date class
}; 

export default Device;
export type ScheduleType = "on" | "off" | "dim" | "and" | "or";
export type TriggerType = "timing" | "device";
export type WeekDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"; // note: I am sure there are alternative to this in-built.