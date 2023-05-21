import { Router } from "express";
import * as ScheduleController from '../controllers/schedule.controller';
import AuthorizeUserFromToken from "../middlewares/tokenauth.middleware";

const ScheduleRouter: Router = Router();

ScheduleRouter.post("/new", AuthorizeUserFromToken, ScheduleController.CreateSchedule);
ScheduleRouter.post("/remove", AuthorizeUserFromToken, ScheduleController.DeleteSchedule);
ScheduleRouter.put("/edit", AuthorizeUserFromToken, ScheduleController.EditSchedule);
ScheduleRouter.get("/list-by-user", AuthorizeUserFromToken, ScheduleController.ListScheduleUnderUser);
ScheduleRouter.get("/list-by-firing-device/:chip_id", AuthorizeUserFromToken, ScheduleController.ListScheduleUnderDevice);
ScheduleRouter.get("/list-by-triggered-device/:linked_chip_id", AuthorizeUserFromToken, ScheduleController.ListScheduleUnderLinkedDevice);

export default ScheduleRouter;
