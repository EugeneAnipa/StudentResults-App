import express from "express";
import "dotenv/config";
import fs from "node:fs";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

var accessLogStream = fs.createWriteStream((__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", function (req, res) {
  res.send("welcome to the real estate app");
});
app.listen(8000, () => {
  console.log("server is running on 8000");
});
