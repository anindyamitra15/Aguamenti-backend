import express from 'express';
import cors from 'cors';
import { port } from './envparser';
import dbconnect from './dbconnect';
import UserRouter from './routes/user.route';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);

app.get("/", async (req, res) => {
    res.send("OK");
})


const httpServerObj = app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
    dbconnect;
});

