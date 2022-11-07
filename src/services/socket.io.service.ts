import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "../dtos/socket.io.dtos";
let intervalObj: any = null;

export function socketConnection(io: Server) {
    return (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
        console.log(`${socket.data.type} with ID:`, socket.id, "connected");

        socket.on("disconnect", onDisconnection(socket));
        socket.on("testServer", onTestServer(socket));
        socket.on("from_device", FromDeviceHandler(io, socket));
        socket.on("from_ui", FromUIHandler(io, socket));

        // let i = 0;
        // intervalObj = setInterval(() => {
        //     socket.emit("testClient", `Hi Client! - ${i}`);
        //     i++;
        // }, 3000);
    };
}


const onDisconnection = (socket: Socket) => {
    return () => {
        console.log(`Disconnected ${socket.data.type} from ${socket.id}`);
        // if (intervalObj !== null) clearInterval(intervalObj);
    };
};

const onTestServer = (socket: Socket) => {
    return (data: string) => {
        console.log(data)
    };
};

const FromDeviceHandler = (io: Server, socket: Socket) => {
    return (data: string) => {
        io.emit("to_ui", data);
    };
};

const FromUIHandler = (io: Server, socket: Socket) => {
    return (data: string) => {
        io.emit("to_device", data);
    };
};