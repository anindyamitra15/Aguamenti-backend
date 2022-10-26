import { genSaltSync, hashSync } from "bcryptjs";
import { Types, Schema, Document, Model, model } from "mongoose";
import { salt_rounds } from "../envparser";

export interface UserInterface extends Document {
    name: string,
    password: string,
    email: string,
    house_ids?: Array<Types.ObjectId>
};

const UserSchema: Schema<UserInterface> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        house_ids: [{ type: Schema.Types.ObjectId, ref: 'House' }],
    },
    {
        timestamps: true
    }
);

UserSchema.pre<UserInterface>("save", function (next) {
    if (!this.isModified("password") || !this.isNew) {
        next();
    } else {
        if (this.password) {
            const salt = genSaltSync(salt_rounds);
            this.password = hashSync(this.password, salt);
        }
        next();
    }
});

const User: Model<UserInterface> = model("User", UserSchema);

export default User;