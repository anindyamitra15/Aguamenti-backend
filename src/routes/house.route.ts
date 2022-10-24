import { Router } from "express";
import * as HouseController from '../controllers/house.controller';
import AuthorizeFromToken from "../middlewares/tokenauth.middleware";

const HouseRouter: Router = Router();

HouseRouter.post("/create", AuthorizeFromToken, HouseController.CreateHouse);
HouseRouter.delete("/delete", AuthorizeFromToken, HouseController.DeleteHouse);
HouseRouter.put("/update", AuthorizeFromToken, HouseController.UpdateHouse);
HouseRouter.put("/add-device", AuthorizeFromToken, HouseController.AddDevice);
HouseRouter.put("/remove-device", AuthorizeFromToken, HouseController.RemoveDevice);
HouseRouter.put("/add-user", AuthorizeFromToken, HouseController.AddUser);
HouseRouter.put("/remove-user", AuthorizeFromToken, HouseController.RemoveUser);
HouseRouter.put("/change-owner", AuthorizeFromToken, HouseController.ChangeOwner);

export default HouseRouter;