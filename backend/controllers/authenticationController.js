import express from "express";

import bcrypt from "bcryptjs";
import { databaseModels } from "../models/sequelize.js";
import passport from "passport";
import { Strategy } from "passport-local";

//import { databaseModels } from "../models/sequelize.js";
//try putting the two below in app and see if it will still work n and the body parser import also
const saltRounds = 10;

//change later to axios

const signUpPost = async function (req, res) {
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

//dashboard
const dashboardGet = async function (req, res) {
  console.log(req.username);
  if (req.isAuthenticated()) {
    console.log(req.username + " logged into dashbaord");
  } else {
    res.send("login page");
  }
};

/*
const login = async function (req, res) {
  try {
    const email = req.body.username;
    const password1 = req.body.password;

    const emailFinder = await databaseModels.signUpModel.findOne({
      where: {
        email: email,
      },
    });
    console.log(emailFinder);

    if (emailFinder === null) {
      //res.send("account does not exist! create one!");
      return cb(null, false);
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
          //res.send("correct password");
          return cb(null, username);
        } else if (result === false) {
          //res.send("wrong passwoord");
          return cb(err);
        }
      });

      //console.log(hashComapred);
    }
  } catch (err) {
    console.log(cb(err));
  }
};


*/

/*
//to test and deelte top
app.post(
  "/login",

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
  function (req, res) {
    if ("/login") {
      console.log("this is the post login details" + req.match, req.result);
    }
  }
);
//to test and delete   down
*/
/** login get*/
const loginGet = async function (req, res) {
  console.log("try to sign in");
};
/**  */

const loginPost = async function (req, res) {
  passAuth;
  //tru the fxn , passathen, then call everything in

  if ("/login") {
    console.log("this is the post login details");
  }
};

const passAuth = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
});

console.log(passport);
passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: false,
    },

    async function verify(username, password, cb) {
      try {
        //const email = req.body.email;
        //const password1 = req.body.password;

        const emailFinder = await databaseModels.signUpModel.findOne({
          where: {
            email: username,
          },
        });
        console.log(emailFinder);

        if (emailFinder === null) {
          //res.send("account does not exist! create one!");
          console.log("account does not exist! create one!");
        } else if (!(emailFinder === null)) {
          const passwordFinder = await databaseModels.signUpModel.findOne({
            where: {
              email: username,
            },
          });

          const foundHash = await passwordFinder.password;

          //hash found here
          await console.log(foundHash);

          await bcrypt.compare(password, foundHash, function (err, result) {
            if (result === true) {
              //res.send("correct password");
              console.log("correct password");
            } else if (result === false) {
              //res.send("wrong passwoord");
              console.log("wrong passwoord");
            }
          });

          //console.log(hashComapred);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((username, cb) => {
  cb(null, username);
});

passport.deserializeUser((username, cb) => {
  cb(null, username);
});

const authenControls = {
  signUpPost,
  loginPost,
  passAuth,
  dashboardGet,
  loginGet,
};
console.log(passport);
export { authenControls };
