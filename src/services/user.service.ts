import { GenericResponse } from "../dtos/response.dtos";
import { UserLoginDto, UserRegisterDto } from "../dtos/user.dtos";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../envparser";
import { compare } from "bcryptjs";

export const Register = async (user: UserRegisterDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
            if (!await compare(user.password, findUser.password))
                return { code: 400, message: "Credentials doesn't match" };
            const token = jwt.sign({
                email: findUser.email,
                _id: findUser._id
            }, jwt_secret);
            return { code: 202, message: "User exists", result: { token } };
        }

        const newUser = new User({ ...user });

        await newUser.save();

        const token = jwt.sign({
            email: newUser.email,
            _id: newUser._id
        }, jwt_secret);

        return { code: 200, message: "Registered", result: { token } };

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const Login = async (user: UserLoginDto): Promise<GenericResponse> => {
    try {
        //TODO: findUser
        // return 404 if not found
        // otherwise sign jwt as in Register service <line 22>
        // return code: 200, message: success, result: {token}
        const findUser = await User.findOne({ email: user.email })
        if (!findUser)
            return { code: 404, message: "User doesn't exist" };

        if (!await compare(user.password, findUser.password))
            return { code: 400, message: "Credentials doesn't match" };
        const token = jwt.sign({
            email: findUser.email,
            _id: findUser._id
        }, jwt_secret);
        return { code: 200, message: "Logged in", result: { token } };

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const ChangePassword = async () => {
    try {

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const AddHouse = async () => {
    try {

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const RemoveHouse = async () => {
    try {

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};
