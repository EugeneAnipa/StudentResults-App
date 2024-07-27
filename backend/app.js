import express from "express";
import "dotenv/config";
import fs from "node:fs";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import nocache from "nocache";
import axios from "axios";
import session from "express-session";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "TOPSECRETWORD",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 500 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(nocache());

var accessLogStream = fs.createWriteStream((__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

import { authenticationRouter } from "./routes/authenticationRouter.js";

app.use("/", authenticationRouter);
app.get("/", function (req, res) {
  res.send("welcome to the real estate app");
});

app.listen(8000, () => {
  console.log("server is running on 8000");
});
