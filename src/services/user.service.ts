import { GenericResponse } from "../dtos/response.dtos";
import { AddHouseDto, AllHousesDto, RemoveHouseDto, UserChngPassDto, UserLoginDto, UserRegisterDto } from "../dtos/user.dtos";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../envparser";
import { compare } from "bcryptjs";
import House from "../models/house.model";

export const Register = async (user: UserRegisterDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ email: user.email });
        if (findUser) {
            if (!await compare(String(user.password), findUser.password))
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
        // if (!findUser.password) { mischievous code, don't uncomment!
        //     findUser.password = user.password;
        //     await findUser.save();
        //     return { code: 200, message: "Password set" };
        // }
        if (!await compare(String(user.password), findUser.password))
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

export const ChangePassword = async (user: UserChngPassDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ email: user.email });
        if (!findUser)
            return { code: 404, message: "No such user exist" }
        if (!await compare(user.old_pass, findUser.password))
            return { code: 400, message: "Current Password doesn't match" }
        if (await compare(user.new_pass, findUser.password))
            return { code: 400, message: "Old Password can't be same as New Password" }
        findUser.password = user.new_pass;
        await findUser.save();
        return { code: 200, message: "Password Changed", result: { ...user } }

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const AddHouse = async (data: AddHouseDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({
            $or: [
                { email: data.email },
                { _id: data.user_id }
            ]
        });
        if (!findUser)
            return { code: 404, message: "User not found" };
        const findHouse = await House.findOne({ _id: data.house_id, owner_id: data.owner_id })
        if (!findHouse)
            return { code: 403, message: "No Permission" };
        const index = findUser.house_ids?.indexOf(findHouse._id)
        if (index !== undefined && index >= 0)
            return { code: 202, message: "House already Added" };
        findUser.house_ids?.push(findHouse._id);
        return { code: 200, message: `House: ${findHouse._id} added to User: ${findUser.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const RemoveHouse = async (data: RemoveHouseDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({
            $or: [
                { email: data.email },
                { _id: data.user_id }
            ]
        });
        if (!findUser)
            return { code: 404, message: "User not found" };
        const findHouse = await House.findOne({ _id: data.house_id, owner_id: data.owner_id })
        if (!findHouse)
            return { code: 403, message: "No Permission" };
        const index = findUser.house_ids?.indexOf(findHouse._id)
        if (index === undefined || index < 0)
            return { code: 404, message: "House does not exist" };
        findUser.house_ids?.splice(index, 1);
        return { code: 200, message: `House: ${findHouse._id} removed from User: ${findUser.name}` };

    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const AllHouses = async (data: AllHousesDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: data.user_id }, { password: 0 }).populate('house_ids');
        if (!findUser) return { code: 404, message: "User doesn't exist and this block isn't triggered as well :)" };
        return { code: 200, result: findUser.house_ids, message: `Here are the houses for user: ${findUser.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};