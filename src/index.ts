import express from 'express';
import cors from 'cors';
import { port } from './envparser';
import dbconnect from './dbconnect';
import UserRouter from './routes/user.route';
import HouseRouter from './routes/house.route';
import DeviceRouter from './routes/device.route';

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


const httpServerObj = app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
    dbconnect;
});

