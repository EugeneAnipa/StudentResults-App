import "dotenv/config";

import express from "express";

import fs from "node:fs";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
//import { Strategy } from "passport-local";
import nocache from "nocache";
//import axios from "axios";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", "../frontend/views");
//app.use(express.static("public"));

app.use(express.static(path.join("../frontend/" + "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var accessLogStream = fs.createWriteStream((__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

//Session
app.use(
  session({
    secret: process.env.SESSIONSECRET,
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

import { authenticationRouter } from "./routes/authentication.Router.js";
import { dashRouter } from "./routes/dashboard.Router.js";
import { biodataRouter } from "./routes/biodata.Router.js";

app.use("/", authenticationRouter);

app.use("/", dashRouter);
app.use("/biodata", biodataRouter);

/*
app.get("/", function (req, res) {
  res.send("welcome to the real estate app");
});
*/
app.listen(8000, () => {
  console.log("server is running on 8000");
});
