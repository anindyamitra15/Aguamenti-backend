import { Router } from "express";
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";
import * as DeviceController from "../controllers/device.controller";

const DeviceRouter: Router = Router();

DeviceRouter.post("/create", AuthorizeUserFromToken, DeviceController.Create);
DeviceRouter.get("/login/:chip_id", DeviceController.Login);
DeviceRouter.post("/update", AuthorizeUserFromToken, DeviceController.UpdateDevice);
// TODO: filter queries
DeviceRouter.get("/house-snapshot", AuthorizeUserFromToken, DeviceController.HouseSnapshot);
DeviceRouter.post("/change-house", DeviceController.ChangeHouse);

export default DeviceRouter;