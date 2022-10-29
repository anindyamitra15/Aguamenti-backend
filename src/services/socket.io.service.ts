import { Socket } from "socket.io";

export function socketConnection(socket: Socket) {
    console.log(socket.id, "connected");
    socket.on("disconnect", onDisconnect(socket));
};


function onDisconnect(socket: Socket) {
    return () => {
        console.log("disconnected", socket.id);
    }
};