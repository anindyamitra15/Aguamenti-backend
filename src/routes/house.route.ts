import { Router } from "express";
import * as HouseController from '../controllers/house.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const HouseRouter: Router = Router();

HouseRouter.post("/create", AuthorizeUserFromToken, HouseController.CreateHouse);
HouseRouter.delete("/delete", AuthorizeUserFromToken, HouseController.DeleteHouse);
HouseRouter.put("/update", AuthorizeUserFromToken, HouseController.UpdateHouse);
HouseRouter.put("/add-device", AuthorizeUserFromToken, HouseController.AddDevice);
HouseRouter.put("/remove-device", AuthorizeUserFromToken, HouseController.RemoveDevice);
HouseRouter.put("/add-user", AuthorizeUserFromToken, HouseController.AddUser);
HouseRouter.put("/remove-user", AuthorizeUserFromToken, HouseController.RemoveUser);
HouseRouter.put("/change-owner", AuthorizeUserFromToken, HouseController.ChangeOwner);

export default HouseRouter;