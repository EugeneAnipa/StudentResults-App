import express from "express";

import bcrypt from "bcryptjs";

//import { databaseModels } from "../models/sequelize.js";
//try putting the two below in app and see if it will still work n and the body parser import also

const saltRounds = 10;

//change later to axios

const signUp = async function (req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  console.log(firstname, lastname, email, password);
};

export { signUp };
