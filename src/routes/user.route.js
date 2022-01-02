const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post("/register", UserController);
router.post("/login", UserController);
router.put("/update", UserController);
router.post("/token", UserController);
router.get('/list', UserController) //fetch all the users
router.get('/list/:id', UserController)//fetch thru id
router.get('/list/:email', UserController)//fetch thru email
router.delete("/logout", UserController);
router.delete("/delete", UserController); //only admins can do

module.export = router;
