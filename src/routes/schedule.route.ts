import { Router } from "express";
import * as ScheduleController from '../controllers/schedule.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const ScheduleRouter: Router = Router();

ScheduleRouter.post("/new", AuthorizeUserFromToken, ScheduleController.CreateSchedule);
ScheduleRouter.get("/list", AuthorizeUserFromToken, ScheduleController.ListSchedules);
ScheduleRouter.delete("/remove", AuthorizeUserFromToken, ScheduleController.DeleteSchedule);
ScheduleRouter.put("/edit", AuthorizeUserFromToken, ScheduleController.EditSchedule);

export default ScheduleRouter;
