import { Socket } from "socket.io";
let intervalObj: any = null;
export function socketConnection(socket: Socket) {
    console.log(socket.id, "connected");
    socket.on("disconnect", onDisconnection(socket));
    socket.on("testServer", onTestServer(socket));
    let i = 0;
    intervalObj = setInterval(() => {
        socket.emit("testClient", `Hi Client! - ${i}`);
        i++;
    }, 3000);
};


const onDisconnection = (socket: Socket) => {
    return () => {
        console.log(`Disconnected from ${socket.id}`);
        if(intervalObj !== null) clearInterval(intervalObj);
    };
};

const onTestServer = (socket: Socket) => {
    return (data: string) => {
        console.log(data)
    };
};