import { Document, Model, model, Schema, Types } from "mongoose";

export interface HouseInterface extends Document {
    name: string,
    owner_id: Types.ObjectId
};

const HouseSchema: Schema<HouseInterface> = new Schema(
    {
        name: { type: String, unique: true, required: true },
        owner_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {
        timestamps: true
    }
);

const House: Model<HouseInterface> = model("House", HouseSchema);

export default House;