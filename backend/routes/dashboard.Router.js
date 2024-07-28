import { Router } from "express";

import { dashControls } from "../controllers/dashboard.Controller.js";

const dashRouter = Router();

dashRouter.get("/main", dashControls.dashboardGet);

dashRouter.get("/biodata", dashControls.biodataUpdateGet);

dashRouter.post("/biodata", dashControls.biodataUpdatePost);

export { dashRouter };
