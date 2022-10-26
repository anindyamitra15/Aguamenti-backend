import { Router } from "express";
import * as UserController from '../controllers/user.controller';
import AuthorizeFromToken from "../middlewares/tokenauth.middleware";

const UserRouter: Router = Router();

UserRouter.post("/register", UserController.Register);
UserRouter.post("/login", UserController.Login);
UserRouter.put("/change-password", AuthorizeFromToken, UserController.ChangePassword);
UserRouter.put("/add-house");
UserRouter.put("/remove-house");
UserRouter.get("/emailexists", UserController.EmailExists);

export default UserRouter;