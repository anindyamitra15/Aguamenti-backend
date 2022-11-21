import { Types } from "mongoose";

export type Value = boolean | number | string;

export interface UIPacket {
    chip_id: string,
    state?: boolean,
    value?: Value
};

export interface DevicePacket {
    key?: number,
    state?: boolean,
    value?: Value
};

export interface ServerToClientEvents {
    to_device: (data: DevicePacket) => void;
    to_ui: (data: UIPacket) => void;

    testClient: (data: string) => void;
};

export interface ClientToServerEvents {
    from_device: (data: DevicePacket) => void;
    from_ui: (data: UIPacket) => void;

    testServer: (data: string) => void;
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