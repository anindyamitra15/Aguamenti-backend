import { Document, Model, model, Schema } from "mongoose";

interface DeviceInterface extends Document {
    name: string,
    chip_id: string,
    state?: boolean,
    value?: any, //TODO: check if any restrictions can be applied
    house_id?: Schema.Types.ObjectId
};

const DeviceSchema: Schema<DeviceInterface> = new Schema(
    {
        name: { type: String, required: true },
        chip_id: { type: String, required: true },
        state: { type: Boolean },
        value: { type: Schema.Types.Mixed },
        house_id: { type: Schema.Types.ObjectId }
    },
    {
        timestamps: true
    }
);

const Device: Model<DeviceInterface> = model("Device", DeviceSchema);

export default Device;