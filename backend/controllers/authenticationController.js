import express from "express";

import bcrypt from "bcryptjs";
import { databaseModels } from "../models/sequelize.js";

//import { databaseModels } from "../models/sequelize.js";
//try putting the two below in app and see if it will still work n and the body parser import also
const saltRounds = 10;

//change later to axios

const signUp = async function (req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password1 = req.body.password;

  console.log(firstname, lastname, email, password1);
  try {
    //query to find if email exist here
    const emailFinder = await databaseModels.signUpModel.findOne({
      where: {
        email: email,
      },
    });
    console.log(emailFinder);
    if (emailFinder === null) {
      //

      await bcrypt.genSalt(saltRounds, function (err, salt) {
        var salt = bcrypt.genSaltSync(10);

        bcrypt.hash(password1, salt, function (err, hash) {
          // Store hash in your password DB.

          databaseModels.signUpModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
          });
        });
      });
    } else {
      res.send("user account exists");
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async function (req, res) {
  try {
    const email = req.body.email;
    const password1 = req.body.password;

    const emailFinder = await databaseModels.signUpModel.findOne({
      where: {
        email: email,
      },
    });
    console.log(emailFinder);

    if (emailFinder === null) {
      res.send("account does not exist! create one!");
    } else if (!(emailFinder === null)) {
      const passwordFinder = await databaseModels.signUpModel.findOne({
        where: {
          email: email,
        },
      });

      const foundHash = await passwordFinder.password;

      //hash found here
      await console.log(foundHash);

      await bcrypt.compare(password1, foundHash, function (err, result) {
        if (result === true) {
          res.send("correct password");
        } else if (result === false) {
          res.send("wrong passwoord");
        }
      });

      //console.log(hashComapred);
    }
  } catch (err) {
    console.log(err);
  }
};

const authenControls = {
  signUp,
  login,
};
export { authenControls };
