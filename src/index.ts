import { node_env, port, socket_admin } from './envparser';
import cors from 'cors';
import path from 'path';
import express from 'express';
import dbconnect from './dbconnect';
import UserRouter from './routes/user.route';
import HouseRouter from './routes/house.route';
import DeviceRouter from './routes/device.route';
import socketio from "socket.io";
import { instrument } from '@socket.io/admin-ui';
import socketTokenAuth from './middlewares/socketauth.middleware';
import { socketConnection } from './services/socket.io.service';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from './dtos/socket.io.dtos';
const serverStartTime = new Date();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UserRouter);
app.use("/house", HouseRouter);
app.use("/device", DeviceRouter);
app.use('/static', express.static(path.join(__dirname, '../public')));

app.get("/", async (_, res) => {
    res.send(`Server running since ${serverStartTime}`);
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
            origin: "*",
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
