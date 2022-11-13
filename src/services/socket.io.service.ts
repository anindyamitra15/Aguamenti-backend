import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";


export function socketConnection(io: Server) {
    return (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
        console.log(`${socket.data.type} with ID:`, socket.id, "connected");

        socket.on("disconnect", onDisconnection(socket));
        socket.on("testServer", onTestServer(socket));
        socket.on("from_device", FromDeviceHandler(io, socket));
        socket.on("from_ui", FromUIHandler(io, socket));
    };
}


const onDisconnection = (socket: Socket) => {
    return () => {
        console.log(`Disconnected ${socket.data.type} from ${socket.id}`);
    };
};

const onTestServer = (socket: Socket) => {
    return (data: string) => {
        console.log(data);
    };
};

const FromDeviceHandler = (io: Server, socket: Socket) => {
    return (data: string) => {
        socket.broadcast.emit("to_ui", data);
    };
};

const FromUIHandler = (io: Server, socket: Socket) => {
    return (data: string) => {
        socket.broadcast.emit("to_device", data);
    };
};