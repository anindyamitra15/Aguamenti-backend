import jwt from "jsonwebtoken";
import { ExtendedError } from "socket.io/dist/namespace";
import { TypedServer, TypedSocket } from "../dtos/socket.io.dtos";
import { jwt_secret } from "../envparser";
import Device from "../models/device.model";
import User from "../models/user.model";


const socketTokenAuth = async (socket: TypedSocket, next: (err?: ExtendedError | undefined) => void) => {
    try {
        const endpoint: string = socket.handshake.query.ep as string;
        let token = socket.handshake.headers.authorization as string;
        token = token.split(" ")[1] as string;
        if (!token) {
            next(new Error("No token"));
            return;
        }
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

            const chip_id_key = (findDevice.chip_id as string).split('-');
            const num_keys = chip_id_key.length;

            // bootup device sync
            socket.broadcast
                .to(`${socket.data.endpoint as string}/${chip_id_key[0]}`)
                .emit("to_device", {
                    key: (num_keys > 1) ? (chip_id_key[1] as unknown as number) : 0,
                    state: findDevice.state,
                    value: findDevice.value
                });

            socket.data.device = {
                _id: findDevice._id,
                chip_id: findDevice.chip_id
            };
        }

        socket.data.endpoint = endpoint;

        next();

    } catch (error) {
        console.log("Socket Middleware Error", error);
        next(error as ExtendedError);
    }

};

export default socketTokenAuth;