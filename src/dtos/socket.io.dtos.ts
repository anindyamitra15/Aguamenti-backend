import { Types } from "mongoose";

export interface ServerToClientEvents {
    testClient: (data: string) => void;
    to_device: (data: string) => void;
    to_ui: (data: string) => void;
};

export interface ClientToServerEvents {
    testServer: (data: string) => void;
    from_device: (data: string) => void;
    from_ui: (data: string) => void;
    subscribe: (param: { ep: string }) => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    endpoint: string,
    user: {
        _id: Types.ObjectId,
        email: string,
    },
    device: {
        _id: Types.ObjectId,
        chip_id: string
    },
    type: "User" | "Device"
};