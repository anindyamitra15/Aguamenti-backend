const express = require("express");
const cors = require("cors");
const { port } = require("../config/env.config");
const dbConnect = require("../config/db.config");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//route imports
const mainRoutes = require("./routes/main.route");
const userRoutes = require("./routes/user.route");
//route use
app.use("/", mainRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
  dbConnect; //connect to database after starting the server
});
