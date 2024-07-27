import { Router } from "express";

import { authenControls } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.post("/signup", authenControls.signUpPost);

authenticationRouter.post(
  "/login",
  authenControls.passAuth,
  authenControls.loginPost
);

authenticationRouter.get("/dashboard", authenControls.dashboardGet);

authenticationRouter.get("/login", authenControls.loginGet);

export { authenticationRouter };
