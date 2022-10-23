const express = require("express");
const Router = express.Router();
const UserController = require('../controllers/user.controller');

Router.post("/register", UserController.Register);
Router.post("/login", UserController.Login);
// router.put("/update", UserController);
// router.post("/token", UserController);
// router.get('/list', UserController) //fetch all the users
// router.get('/list/:id', UserController)//fetch thru id
// router.get('/list/:email', UserController)//fetch thru email
// router.delete("/logout", UserController);
// router.delete("/delete", UserController); //only admins can do

module.exports = Router;
