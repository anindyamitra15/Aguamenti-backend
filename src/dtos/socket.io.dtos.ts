export interface ServerToClientEvents {
    testClient: () => void;
};

export interface ClientToServerEvents {
    testServer: () => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    testString: string;
};