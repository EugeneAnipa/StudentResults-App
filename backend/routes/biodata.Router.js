import { Router } from "express";

import { biodataControls } from "../controllers/biodata.Controller.js";

const biodataRouter = Router();

biodataRouter.get("/biodata", biodataControls.biodataGet);

biodataRouter.patch("/biodata", biodataControls.biodataUpdate);

export { biodataRouter };
