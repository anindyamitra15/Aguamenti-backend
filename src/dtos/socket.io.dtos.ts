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
    testString: string;
    user: {
        _id: Types.ObjectId,
        email: string
    }
};