import { Document, Model, model, Schema, Types } from "mongoose";
import Randomstring from "randomstring";

export interface HouseInterface extends Document {
    name: string,
    owner_id: Types.ObjectId
    endpoint?: string,
};

const HouseSchema: Schema<HouseInterface> = new Schema(
    {
        name: { type: String, unique: true, required: true },
        owner_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        endpoint: { type: String, unique: true }
    },
    {
        timestamps: true
    }
);

HouseSchema.pre<HouseInterface>("save", function (next) {
    if (!this.isNew) {
        next();
    } else {
        const endpoint = Randomstring.generate({
            length: 10,
            charset: 'alphanumeric',
            capitalization: 'lowercase'
        });
        this.endpoint = endpoint;
        next();
    }
});

const House: Model<HouseInterface> = model("House", HouseSchema);

export default House;