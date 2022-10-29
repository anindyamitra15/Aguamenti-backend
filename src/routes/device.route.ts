import { Router } from "express";

const DeviceRouter: Router = Router();

DeviceRouter.post("/create");
DeviceRouter.post("/update");
DeviceRouter.get("/house-snapshot");
DeviceRouter.put("/change-house");
DeviceRouter.put("/change-endpoint");
DeviceRouter.post("/login");

export default DeviceRouter;