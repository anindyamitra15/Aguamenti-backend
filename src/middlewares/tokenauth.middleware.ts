import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../envparser";
import generateResponse from "../httpresponsecreater";
import User from "../models/user.model";

const AuthorizeUserFromToken = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        let token = req.header("Authorization");
        if (!token) return generateResponse(res, 400, "Authorization Header Not Present");

        token = token.split(" ")[1];

        let decoded = jwt.verify(
            token,
            jwt_secret
        ) as jwt.JwtPayload;
        
        if (!decoded) return generateResponse(res, 401, "Token Expired");

        const findUser = await User.findOne({ email: decoded.email }, {password: 0});

        if (!findUser) return generateResponse(res, 404, "User doesn't exist");

        req.body.user = findUser;

        next();

    } catch (error) {
        generateResponse(res, 401, "Token verification failed", error);
    }
};

export default AuthorizeUserFromToken;