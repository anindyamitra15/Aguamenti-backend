import { Types } from "mongoose";

export interface ServerToClientEvents {
    testClient: () => void;
    deviceSide: () => void;
};

export interface ClientToServerEvents {
    testServer: () => void;
    uiSide: () => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    testString: string;
    user: {
        _id: Types.ObjectId,
        email: string
    }
};