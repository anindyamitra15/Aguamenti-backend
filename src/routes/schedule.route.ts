import { Router } from "express";
import * as ScheduleController from '../controllers/schedule.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const ScheduleRouter: Router = Router();

ScheduleRouter.post("/new", AuthorizeUserFromToken, ScheduleController.CreateSchedule);
ScheduleRouter.get("/listusingUID", AuthorizeUserFromToken, ScheduleController.ListScheduleUsingUserID);
ScheduleRouter.get("/listusingDID", AuthorizeUserFromToken, ScheduleController.ListScheduleUsingDeviceID);
ScheduleRouter.get("/listusingLDID", AuthorizeUserFromToken, ScheduleController.ListScheduleUsingLinkedDeviceID);
ScheduleRouter.delete("/remove", AuthorizeUserFromToken, ScheduleController.DeleteSchedule);
ScheduleRouter.put("/edit", AuthorizeUserFromToken, ScheduleController.EditSchedule);

export default ScheduleRouter;
