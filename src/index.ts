import express from 'express';
import cors from 'cors';
import { node_env, port, socket_admin } from './envparser';
import dbconnect from './dbconnect';
import socketio from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import UserRouter from './routes/user.route';
import HouseRouter from './routes/house.route';
import DeviceRouter from './routes/device.route';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './dtos/socket.io.dtos';
import { socketConnection } from './services/socket.io.service';
import socketTokenAuth from './middlewares/socketauth.middleware';

const serverStartTime = new Date();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/house", HouseRouter);
app.use("/device", DeviceRouter);

app.get("/", async (_, res) => {
    res.send(`Server running since ${serverStartTime.toLocaleString()}`);
});

// http server event loop
const httpServerObj = app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
    dbconnect;
});

// socket io setup
const io: socketio.Server = new socketio.Server
    <
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >
    (httpServerObj, {
        cors: {
            origin: [
                "http://localhost:4200",
                "http://localhost:3000",
                "http://localhost:5500",
                "https://admin.socket.io"
            ],
            credentials: true
        }
    });

// socket io admin, log on to: https://admin.socket.io
instrument(io, {
    mode: node_env,
    auth: {
        type: 'basic',
        username: socket_admin.username,
        password: socket_admin.password
    }
});
//middleware
io.use(socketTokenAuth);
//binding connection callback
io.on("connection", socketConnection);
