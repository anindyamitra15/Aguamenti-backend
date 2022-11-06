import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";
import { jwt_secret } from "../envparser";
import Device from "../models/device.model";
import User from "../models/user.model";


const socketTokenAuth = async (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>, next: (err?: ExtendedError | undefined) => void) => {
    try {
        let token = socket.handshake.headers.authorization as string;
        token = token.split(" ")[1];
        const decoded = jwt.verify(
            token,
            jwt_secret
        ) as jwt.JwtPayload;

        if (!decoded) {
            next(new Error("Token Expired"));
            return;
        }
        // if it's a user
        if (decoded.email || decoded._id) {
            socket.data.type = "User";
            const findUser = await User.findOne({ email: decoded.email }, { password: 0 });
            if (!findUser) {
                next(new Error("Invalid User"));
                return;
            }
            socket.data.user = {
                _id: findUser._id,
                email: findUser.email
            };

        }
        // if it's a device
        if (decoded.device_id || decoded.chip_id) {
            socket.data.type = "Device";

            const findDevice = await Device.findOne({
                $or: [
                    { _id: decoded.device_id },
                    { chip_id: decoded.chip_id }
                ]
            });
            if (!findDevice) {
                next(new Error("Invalid Device"));
                return;
            }
            socket.data.device = {
                _id: findDevice._id,
                chip_id: findDevice.chip_id
            };

        }


        next();

    } catch (error) {
        console.log("Socket Middleware Error", error);
        next(error as ExtendedError);
    }
};

export default socketTokenAuth;