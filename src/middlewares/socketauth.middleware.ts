import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { jwt_secret } from "../envparser";
import User from "../models/user.model";

const socketTokenAuth = async (socket: Socket, next: (err?: ExtendedError | undefined) => void) => {
    try {
        const token = socket.handshake.headers.token as string;

        //if it's not an user (it must be a device)
        if (!token) { next(); return; }

        const decoded = jwt.verify(
            token,
            jwt_secret
        ) as jwt.JwtPayload;

        if (!decoded) {
            next(new Error("Token Expired"));
            return;
        }


        const findUser = await User.findOne({ email: decoded.email }, { password: 0 });
        if (!findUser) {
            next(new Error("Invalid User"));
            return;
        }

        socket.data = {
            user: {
                _id: decoded._id,
                _email: decoded.email
            }
        };

        next();

    } catch (error) {
        console.log("Socket Middleware Error", error);

        next(error as ExtendedError);
    }
};

export default socketTokenAuth;