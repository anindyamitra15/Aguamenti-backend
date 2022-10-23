import dotenv from "dotenv";

if (!process.env.NODE_ENV) require("dotenv").config();
else dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


export const port = Number(process.env.PORT || 3000);

export const mongo_uri = String(process.env.MONGO_URI);

export const bcrypt_salt = String(process.env.BCRYPT_SALT);

export const salt_rounds = Number(process.env.SALT_ROUNDS);

export const jwt_secret = String(process.env.SECRET || "supersecretjwtsecret");