const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = Number(process.env.PORT || 3000);
const uri = String(process.env.MONGO_URI);
const startTime = new Date();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//route imports
const mainRoutes = require("./routes/main.route");
const userRoutes = require("./routes/user.route")
//route use
app.use("/", mainRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
