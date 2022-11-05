import { Router } from "express";
import * as UserController from '../controllers/user.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const UserRouter: Router = Router();

UserRouter.post("/register", UserController.Register);
UserRouter.post("/login", UserController.Login);
UserRouter.put("/change-password", AuthorizeUserFromToken, UserController.ChangePassword);
UserRouter.put("/add-house");
UserRouter.put("/remove-house");
// TODO: need to introduce filter queries (later)
UserRouter.get("/all-houses", AuthorizeUserFromToken, UserController.AllHouses);
// for ajax during registration
UserRouter.get("/emailexists", UserController.EmailExists);

export default UserRouter;