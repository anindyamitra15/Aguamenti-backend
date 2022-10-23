import { Router } from "express";
import * as UserController from '../controllers/user.controller';

const UserRouter: Router = Router();

UserRouter.get("/emailexists", UserController.EmailExists);
UserRouter.post("/register", UserController.Register);
UserRouter.post("/login", UserController.Login);
UserRouter.put("/change-password");
UserRouter.put("/add-house");
UserRouter.put("/remove-house");

export default UserRouter;