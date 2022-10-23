import { Document, Model, model, Schema } from "mongoose";

export interface HouseInterface extends Document {
    name: string,
    owner_id: Schema.Types.ObjectId
};

const HouseSchema: Schema<HouseInterface> = new Schema(
    {
        name: { type: String, unique: true, required: true },
        owner_id: { type: Schema.Types.ObjectId, required: true }
    },
    {
        timestamps: true
    }
);

const House: Model<HouseInterface> = model("House", HouseSchema);

export default House;