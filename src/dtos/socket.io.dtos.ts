import { Types } from "mongoose";

export interface ServerToClientEvents {
    testClient: (data: string) => void;
    deviceSide: () => void;
};

export interface ClientToServerEvents {
    testServer: (data: string) => void;
    uiSide: () => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    user: {
        _id: Types.ObjectId,
        email: string
    },
    device: {
        _id: Types.ObjectId,
        chip_id: string
    }
};