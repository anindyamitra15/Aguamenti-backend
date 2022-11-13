import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";


export function socketConnection(socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) {
    console.log(`${socket.data.type} with ID:`, socket.id, "connected");

    socket.on("disconnect", onDisconnection(socket));
    socket.on("testServer", onTestServer(socket));
    socket.on("from_device", FromDeviceHandler(socket));
    socket.on("from_ui", FromUIHandler(socket));
    socket.on("subscribe", OnSubscribe(socket));
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

const FromDeviceHandler = (socket: Socket) => {
    return (data: string) => {
        socket.broadcast.to("492fwgrlr7").emit("to_ui", data);
    };
};

const FromUIHandler = (socket: Socket) => {
    return (data: string) => {
        socket.broadcast.to("492fwgrlr7").emit("to_device", data);
    };
};

const OnSubscribe = (socket: Socket) => {
    return (data: { ep: string }) => {
        console.log("Joined endpoint:", data.ep);
        socket.join(data.ep);
    };
};