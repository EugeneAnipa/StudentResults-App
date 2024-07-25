import { Router } from "express";

import { authenControls } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.post("/signup", authenControls.signUp);

authenticationRouter.post("/login", authenControls.login);

export { authenticationRouter };
