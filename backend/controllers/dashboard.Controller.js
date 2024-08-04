import { databaseModels } from "../models/sequelize.js";

const dashboardGet = async function (req, res) {
  console.log("here is the user grabbed " + req.user);

  try {
    //check biodata if any field empty, redirect to biodate update
    const biodata = await databaseModels.biodataModel.findOne({
      where: {
        email: req.user,
      },
    });

    console.log(biodata.email);
    console.log(biodata.city);

    if (
      biodata.email === null ||
      biodata.DOB === null ||
      biodata.addressLine1 === null ||
      biodata.city === null ||
      biodata.state === null ||
      biodata.zipcode === null ||
      biodata.country === null
    ) {
      //thus get update biodata here
      res.redirect("/biodata");
      console.log("some fields are null need to be field");
      //you render the biodataupdateget over here
    } else {
      //redirect straight to the main dashboard
      console.log("all fiekds complete");
    }
  } catch (err) {
    console.log(err);
  }
};

const biodataUpdateGet = async function (req, res) {
  try {
    //just sending the biodate form to be filled

    const biodataGet = await databaseModels.biodataModel.findAll({
      where: {
        email: req.user,
      },
    });
    res.locals.biodataInfo = biodataGet;
    res.render("biodata");
  } catch (err) {
    console.log(err);
  }
};

const biodataUpdatePost = async function (req, res) {
  try {
    const biodataUpdate = await databaseModels.biodataModel.update(
      { DOB: req.body.dob },
      { addressLine1: req.body.addressline1 },
      { addressLine2: req.body.addressline2 },
      { city: req.body.city },
      { state: req.body.state },
      { zipcode: req.body.zipcode },
      { country: req.body.country },
      { where: { email: req.user } }
    );

    biodataUpdate;
    //after submit, redirect to main dashboard to see results
  } catch (err) {
    console.log(err);
  }
};

const dashControls = { dashboardGet, biodataUpdatePost, biodataUpdateGet };

export { dashControls };
