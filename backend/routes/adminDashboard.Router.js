import { Router } from "express";

import { adminControls } from "../controllers/adminDashboard.Controller.js";

const adminPortalRouter = Router();

adminPortalRouter.get("/", adminControls.adminPortalGet);

adminPortalRouter.post("/student/:email", adminControls.getStudentsGet);

adminPortalRouter.get("/poll", adminControls.poll);

export { adminPortalRouter };
