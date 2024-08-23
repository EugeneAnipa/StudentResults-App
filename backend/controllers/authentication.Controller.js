import bcrypt from "bcryptjs";
import { databaseModels } from "../models/sequelize.js";
import passport from "passport";
import { Strategy } from "passport-local";

//const saltRounds = process.env.SALTROUNDS;
const saltRounds = 10;

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
      res.locals.loggedMSg = "Account Created Sign In";
      let html = `<p  hx-swap="outerHTML" hx-target="msgPasser"><%= LoggedMsg %></p>`;

      res.render("signup", (err, html) => {
        res.send(html);
      });
    } else {
      res.locals.loggedMSg = "Email already exists! Try Again";
      let html = `<p  hx-swap="outerHTML" hx-target="msgPasser"><%= LoggedMsg %></p>`;

      res.render("signup", (err, html) => {
        res.send(html);
      });
    }
  } catch (err) {
    console.log(err);
  }
};
//signup get

const signUpGet = async function (req, res) {
  res.locals.loggedMSg = "";
  let html = `<p  hx-swap="outerHTML" hx-target="msgPasser"><%= LoggedMsg %></p>`;

  res.render("signup", (err, html) => {
    res.send(html);
  });
};

//dashboard userPasser
const userEmailPasserGet = async function (req, res, next) {
  console.log(req.user + req.user);

  console.log(req.isAuthenticated());

  if (req.isAuthenticated() === true) {
    res.redirect("/main");
    next();
    //console.log(req.user + " logged into dashbaord");
  } else if (req.isUnauthenticated() === true) {
    console.log("wrong login details here again f");

    //res.send("login page");
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
const loginGet = async function (req, res, next) {
  console.log(req.method);

  res.render("login", { error: req.flash() });
};
/**  */
/** test function  */

/** test function  */
const loginPost = async function (req, res) {};

/**  login failure handle here  */
const loginFailure = async function (req, res) {
  if (req.isUnauthenticated()) {
    // console.log("wrong input details");
    res.render("login");
  }
};

/**  login failure handle here  */

/**  login failure handle here post */
const loginFailurePost = async function (req, res) {
  let html = "Wrong Login details";
  setTimeout(() => {
    res.send(html);
  }, 2000);

  //res.send(html);
};

/**  login failure handle here post */

const passAuth = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
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
      passReqToCallback: true,
    },

    async function verify(req, user, password, cb) {
      // const user = req.body.username;
      // const password = req.body.password;
      console.log({ user });
      console.log({ cb });
      //console.log(req.session.messages);
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

          return cb(null, false, {
            message: "Account does not exist!",
          });
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

              return cb(null, user);
            } else if (result === false) {
              //res.send("wrong passwoord");

              console.log("wrong passwoord ");

              return cb(null, false, {
                message: `Incorrect Password`,
              });
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

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const authenControls = {
  signUpPost,
  signUpGet,
  loginPost,
  passAuth,
  userEmailPasserGet,
  loginGet,
  logoutGet,
  logoutPost,
  loginFailure,
  loginFailurePost,
};
console.log(passport);

export { authenControls };
