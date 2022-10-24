import { Error } from "mongoose";
import { CreateHouseDto, DeleteHouseDto } from "../dtos/house.dtos";
import { GenericResponse } from "../dtos/response.dtos";
import House from "../models/house.model";

export const CreateHouse = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({ name: house.name, owner_id: house.owner_id });
        if (findHouse) return { code: 400, message: "House Exists" };
        const newHouse = new House({ name: house.name, owner_id: house.owner_id });
        await newHouse.save();
        return { code: 200, result: { house_id: newHouse._id } };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const DeleteHouse = async (house: DeleteHouseDto): Promise<GenericResponse> => {
    try {
        const findHouse = await House.findOne({ _id: house._id, owner_id: house.owner_id });
        if (!findHouse) return { code: 400, message: "No permission or house doesn't exist" };
        await findHouse.delete();
        return { code: 200, message: "House Deleted" };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const UpdateHouse = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const AddDevice = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
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

export const AddUser = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const RemoveUser = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};

export const ChangeOwner = async (house: CreateHouseDto): Promise<GenericResponse> => {
    try {
        return { code: 200 };
    } catch (error) {
        console.log(error);
        return { code: 500 };
    }
};