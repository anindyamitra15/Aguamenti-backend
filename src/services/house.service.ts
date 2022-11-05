import { ChangeOwnerDto, CreateHouseDto, DeleteHouseDto, UpdateHouseDto, UpdateUserHouseDto } from "../dtos/house.dtos";
import { GenericResponse } from "../dtos/response.dtos";
import House from "../models/house.model";
import User from "../models/user.model";
import Randomstring from "randomstring";
import { Types } from "mongoose";

export const CreateHouse = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: house.owner_id });
        const findHouse = await House.findOne({ name: house.name, owner_id: house.owner_id });
        if (findHouse) return { code: 400, message: "House Exists" };
        const endpoint = Randomstring.generate({
            length: 10,
            charset: 'alphanumeric',
            capitalization: 'lowercase'
        });
        const newHouse = new House({ name: house.name, owner_id: house.owner_id, endpoint });
        findUser?.house_ids?.push(newHouse._id);
        await findUser?.save();
        await newHouse.save();
        return { code: 200, result: { house_id: newHouse._id }, message: "House created" };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const DeleteHouse = async (house: DeleteHouseDto): Promise<GenericResponse> => {
    try {
        const findUser = await User.findOne({ _id: house.owner_id });
        const findHouse = await House.findOne({ _id: house._id, owner_id: house.owner_id });
        if (!findHouse) return { code: 400, message: "No permission or house doesn't exist" };
        const index: number | null = findUser?.house_ids?.indexOf(findHouse._id) as number;
        if (index > -1) {
            findUser?.house_ids?.splice(index, 1);
            await findUser?.save();
        }
        await findHouse.delete();
        return { code: 200, message: "House Deleted" };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const UpdateHouse = async (house: UpdateHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({ _id: house._id, owner_id: house.owner_id });
        if (!findHouse) return { code: 400, message: "No permission or house doesn't exist" };
        findHouse.name = house.name;
        await findHouse.save();
        return { code: 200, result: { ...house } };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const AddDevice = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500, message: error as string };
    }
};

export const RemoveDevice = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const AddUser = async (data: UpdateUserHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({
            _id: data.house_id,
            owner_id: data.owner_id
        });
        if (!findHouse)
            return { code: 403, message: "No permission or house inexistent" };

        const findUser = await User.findOne({ _id: data.user_id });
        if (!findUser) return { code: 404, message: "Invalid user_id" };

        const index = findUser.house_ids?.indexOf(findHouse._id) || null;
        if (index) {
            if (index > -1) return { code: 202, message: "User already has access to house" };
            findUser.house_ids?.push(findHouse._id);
            await findUser.save();
        }
        return { code: 200, message: `User ${findUser.name} added to House ${findHouse.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const RemoveUser = async (data: UpdateUserHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({
            _id: data.house_id,
            owner_id: data.owner_id
        });
        if (!findHouse)
            return { code: 403, message: "No permission or house inexistent" };

        const findUser = await User.findOne({ _id: data.user_id });
        if (!findUser) return { code: 404, message: "Invalid user_id" };

        const index = findUser.house_ids?.indexOf(findHouse._id) || null;
        if (index) {
            if (index < 0) return { code: 202, message: "User doesn't have access to house" };
            findUser.house_ids?.splice(index, 1);
            await findUser.save();
        }
        return { code: 200, message: `User ${findUser.name} removed from House ${findHouse.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const ChangeOwner = async (data: ChangeOwnerDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({ _id: data._id, owner_id: data.owner_id });
        if (!findHouse) return { code: 400, message: "No permission or house doesn't exist" };
        const findNewOwner = await User.findOne({ _id: data.new_owner_id });
        if (!findNewOwner) return { code: 400, message: "Invalid User specified" };
        findHouse.owner_id = data.new_owner_id;
        await findHouse.save();
        return { code: 200, message: `Owner changed to ${findNewOwner.name}` };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};