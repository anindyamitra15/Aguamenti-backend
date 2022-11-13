import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";

type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export function socketConnection(socket: TypedSocket) {
    console.log(`${socket.data.type} with ID:`, socket.id, "connected");

    socket.on("disconnect", onDisconnection(socket));
    socket.on("testServer", onTestServer(socket));
    socket.on("from_device", FromDeviceHandler(socket));
    socket.on("from_ui", FromUIHandler(socket));
    socket.on("subscribe", OnSubscribe(socket));
}


const onDisconnection = (socket: TypedSocket) => {
    return () => {
        console.log(`Disconnected ${socket.data.type} from ${socket.id}`);
    };
};

const onTestServer = (socket: TypedSocket) => {
    return (data: string) => {
        console.log(data);
    };
};

const FromDeviceHandler = (socket: TypedSocket) => {
    return (data: string) => {
        socket.broadcast.to("492fwgrlr7").emit("to_ui", data);
    };
};

const FromUIHandler = (socket: TypedSocket) => {
    return (data: string) => {
        socket.broadcast.to(socket.data.endpoint as string).emit("to_device", data);
    };
};
const OnSubscribe = (socket: TypedSocket) => {
    return (data: { ep: string }) => {
        if (data.ep) {
            console.log("Joined endpoint:", data.ep);
            socket.join(data.ep);
            socket.data.endpoint = data.ep;
        }
    };
};