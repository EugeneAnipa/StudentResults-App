import { Router } from "express";

import { authenControls } from "../controllers/authentication.Controller.js";

const authenticationRouter = Router();

authenticationRouter.post("/signup", authenControls.signUpPost);
authenticationRouter.get("/signup", authenControls.signUpGet);

authenticationRouter.post(
  "/login",
  authenControls.passAuth /*,
  authenControls.loginPost */
);

authenticationRouter.get("/dashboard", authenControls.userEmailPasserGet);

authenticationRouter.get(
  "/login",
  authenControls.loginGet /*,
  authenControls.passAuth */
);
authenticationRouter.post("/login", authenControls.passAuth);

authenticationRouter.get("/logout", authenControls.logoutGet);

authenticationRouter.post("/logout", authenControls.logoutPost);

authenticationRouter.get("/loginfail", authenControls.loginFailure);

authenticationRouter.post("/loginfail", authenControls.loginFailurePost);

//loginFailure

export { authenticationRouter };
