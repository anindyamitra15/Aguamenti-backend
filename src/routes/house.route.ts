import { Router } from "express";
import * as HouseController from '../controllers/house.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const HouseRouter: Router = Router();

HouseRouter.post("/create", AuthorizeUserFromToken, HouseController.CreateHouse);
HouseRouter.delete("/delete", AuthorizeUserFromToken, HouseController.DeleteHouse);
HouseRouter.post("/update", AuthorizeUserFromToken, HouseController.UpdateHouse);
HouseRouter.post("/change-owner", AuthorizeUserFromToken, HouseController.ChangeOwner);
HouseRouter.post("/add-user", AuthorizeUserFromToken, HouseController.AddUser);
HouseRouter.post("/remove-user", AuthorizeUserFromToken, HouseController.RemoveUser);
HouseRouter.post("/add-device", AuthorizeUserFromToken, HouseController.AddDevice);
HouseRouter.post("/remove-device", AuthorizeUserFromToken, HouseController.RemoveDevice);

export default HouseRouter;