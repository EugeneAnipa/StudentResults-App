import bcrypt from "bcryptjs";
import { databaseModels } from "../models/sequelize.js";
import passport from "passport";
import { Strategy } from "passport-local";

const saltRounds = process.env.SALTROUNDS;

//session

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
        var salt = bcrypt.genSaltSync(saltRounds);

        bcrypt.hash(password1, salt, function (err, hash) {
          // Store hash in your password DB.

          databaseModels.signUpModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash,
          });
          //entering the email to the biodatamodel
          databaseModels.biodataModel.create({
            email: email,
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

//dashboard userPasser
const userEmailPasserGet = async function (req, res, next) {
  console.log(req.user + req.user);

  // console.log(PassorFailHolder);
  next();
  if (PassorFailHolder[-1] === false) {
    console.log("attempt to login again");
    PassorFailHolder = undefined;
  } else if (PassorFailHolder === req.user) {
    PassorFailHolder = undefined;

    res.redirect("/main");
  }

  /*

  PassorFailHolder = undefined;

  console.log(PassorFailHolder);

  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.redirect("/main");

    //console.log(req.user + " logged into dashbaord");
  } else {
    console.log("wrong login details");
    //res.send("login page");
  }

  */
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
  res.render("login.ejs");
};
/**  */
/** test function ,arrays */
const PassorFailHolder = [];

/** test function  */
const loginPost = async function (req, res) {
  passAuth;
};

const passAuth = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureMessage: true,
});

const logoutGet = async function (req, res) {
  console.log("login page");
};

const logoutPost = async function (req, res) {
  res.clearCookie("connect.sid");
  req.logout(function (err) {
    req.session.destroy(function (err) {
      res.send();
      console.log("session destroyed");
    });

    res.redirect("/login");
  });
};

console.log(passport);

passport.use(
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: false,
    },

    async function verify(user, password, cb) {
      try {
        const emailFinder = await databaseModels.signUpModel.findOne({
          where: {
            email: user,
          },
        });
        console.log(emailFinder);

        if (emailFinder === null) {
          //res.send("account does not exist! create one!");
          //const wrongEmail = "wrong email address";
          console.log("account does not exist! create one!");
          PassorFailHolder.push(false);
          //console.log(PassorFailHolder);

          return cb(null, false, PassorFailHolder);
        } else if (!(emailFinder === null)) {
          const passwordFinder = await databaseModels.signUpModel.findOne({
            where: {
              email: user,
            },
          });

          const foundHash = await passwordFinder.password;

          //hash found here
          await console.log(foundHash);

          await bcrypt.compare(password, foundHash, function (err, result) {
            if (result === true) {
              //res.send("correct password");
              console.log("correct password " + user);
              PassorFailHolder.push(user);
              //console.log(PassorFailHolder);

              return cb(null, user, PassorFailHolder);
            } else if (result === false) {
              //res.send("wrong passwoord");
              PassorFailHolder.push(false);
              //console.log(PassorFailHolder);

              console.log("wrong passwoord ");
              return cb(null, false, PassorFailHolder);
            }
          });

          //console.log(hashComapred);
        } else {
          return cb(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
console.log(passport.message);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const authenControls = {
  signUpPost,
  loginPost,
  passAuth,
  userEmailPasserGet,
  loginGet,
  logoutGet,
  logoutPost,
};
console.log(passport);
export { authenControls };
