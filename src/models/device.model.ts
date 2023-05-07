import { Document, Model, model, Schema, Types } from "mongoose";

export type DeviceType = "switch" | "slider" | "pump" | "tank_level";
export const DeviceTypes: string[] = ["switch", "slider", "pump", "tank_level"];


interface DeviceInterface extends Document {
    name: string,
    chip_id: string,
    state?: boolean,
    value?: any, //TODO: check if any restrictions should be applied
    online: boolean,
    // schedules: [Schedule]
    house_id?: Types.ObjectId,
    schedule_ids?:Array<Types.ObjectId>,
    device_type?: DeviceType,
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
        schedule_ids: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
    },
    {
        timestamps: true
    }
);


const Device: Model<DeviceInterface> = model("Device", DeviceSchema);


export default Device;
