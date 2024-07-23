import { Router } from "express";

import { signUp } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.post("/", signUp);

export { authenticationRouter };
