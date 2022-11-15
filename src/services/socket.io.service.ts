import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";

type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export function socketConnection(socket: TypedSocket) {
    console.log(`${socket.data.type} with ID:`, socket.id, "connected");

    socket.join(socket.data.endpoint as string);
    console.log("Joined endpoint:", socket.data.endpoint);

    socket.on("disconnect", onDisconnection(socket));
    socket.on("testServer", onTestServer(socket));
    socket.on("from_device", FromDeviceHandler(socket));
    socket.on("from_ui", FromUIHandler(socket));
}


const onDisconnection = (socket: TypedSocket) => {
    return () => {
        socket.leave(socket.data.endpoint as string);
        console.log("Left endpoint:", socket.data.endpoint);
        console.log(`Disconnected ${socket.data.type} from ${socket.id}`);
    };
};

const onTestServer = (socket: TypedSocket) => {
    return (data: string) => {
        console.log(data);
    };
};

const FromDeviceHandler = (socket: TypedSocket) => {
    return (data: any) => {
        console.log("from_device", data);
        socket.broadcast.to(socket.data.endpoint as string).emit("to_ui", data);
    };
};

const FromUIHandler = (socket: TypedSocket) => {
    return (data: any) => {
        console.log("from_ui", data);
        socket.broadcast.to(socket.data.endpoint as string).emit("to_device", data);
    };
};
