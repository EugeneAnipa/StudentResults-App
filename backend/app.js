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
import flash from "connect-flash";

/**    ws webscoket  */
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

/** web socket server */
const chatTest = wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});
/** web socket server */

/**    ws webscoket  */

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", "../frontend/views");
//app.use(express.static("public"));

app.use(express.static(path.join("../frontend/" + "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
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
import { adminPortalRouter } from "./routes/adminDashboard.Router.js";

app.use("/", authenticationRouter);

app.use("/", dashRouter);
app.use("/biodata", biodataRouter);
app.use("/admin", adminPortalRouter);

/*
app.get("/", function (req, res) {
  res.send("welcome to the real estate app");
});
*/

/**    ws webscoket  */
/*
import WebSocket, { WebSocketServer } from "ws";

const server = http.createServer(app);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("recieved: %s", message);
  });
  ws.send("this is a message");
});
*/
/**    ws webscoket  */

app.listen(8000, () => {
  console.log("server is running on 8000");
});
