import { Router } from "express";

const DeviceRouter: Router = Router();

DeviceRouter.post("/login");
DeviceRouter.get("/house-snapshot");
DeviceRouter.post("/update");

export default DeviceRouter;