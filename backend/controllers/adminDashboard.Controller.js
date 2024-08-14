import { databaseModels } from "../models/sequelize.js";

const adminLogin = async function (req, res) {};

const adminPortalGet = async function (req, res) {
  try {
    var [studentsSQL] = await databaseModels.studentMgtDB.query(
      "SELECT firstname,lastname,email FROM signupmodels"
    );
    // console.log(JSON.stringify(allStudents));

    for (let a = 0; a < studentsSQL.length; a++) {
      console.log(studentsSQL[a]);

      // res.locals.displayPhotos = photoresult[a].photos;
    }

    res.locals.students = studentsSQL;
    res.render("adminDashboard");
  } catch (err) {
    console.log(err);
  }
};

let counter = 0;

const poll = async function (req, res) {
  counter++;
  const data = counter;
  console.log(data);
  res.json(data);
};
const adminPortalPost = async function (req, res) {};

const updateResultGet = async function (req, res) {};

const updateResultPost = async function (req, res) {};

const deleteStudent = async function (req, res) {};

const getStudentsGet = async function (req, res) {
  try {
    const email = req.params.email;

    console.log(email);

    var [studentsSQL] = await databaseModels.studentMgtDB.query(
      "SELECT * FROM signupmodels WHERE email = ?",
      [email]
    );

    var [studentBio] = await databaseModels.studentMgtDB.query(
      "SELECT * FROM biodatamodels WHERE email = ? ",
      [email]
    );

    var [studentResult] = await databaseModels.studentMgtDB.query(
      "SELECT * FROM coursesgradesmodels WHERE email = ? ",
      [email]
    );

    console.log(studentsSQL[0].email);

    console.log(studentBio[0].DOB);
    console.log(studentResult[0].english);
    res.locals.studentsSQL = studentsSQL[0];
    res.locals.studentBio = studentBio[0];
    res.locals.studentResult = studentResult[0];
    //<%=studentsSQL.email%> using ejs output tags did not work here
    let html = ` <div  hx-swap="outerHTML" class="container" hx-target="#this">
    
        <div class="container-fluid">
        
        <div class="align-items-center">
        <p class=text-center>Biodata</p>
        <label><span></span>${studentsSQL[0].email}</label> <br>
        <label><span>   ${studentsSQL[0].firstname}</span></label> <br>
        <label><span>  ${studentsSQL[0].lastname}</span></label> <br>
        



         <label><span> ${studentBio[0].DOB}</span></label> <br>
        <label><span> ${studentBio[0].addressLine1}</span></label> <br>
        <label><span> ${studentBio[0].addressLine2}</span></label> <br>
        <label><span>  ${studentBio[0].city}</span></label> <br>
        <label><span>  ${studentBio[0].state}</span></label> <br>
        <label><span> ${studentBio[0].zipcode}</span></label> <br>
         <label><span> ${studentBio[0].country}</span></label> <br>
        
        <p class=text-center>Results</p>
        <label><span>  ${studentResult[0].english}</span></label> <br>
        <label><span> ${studentResult[0].mathematics}</span></label> <br>
        <label><span> ${studentResult[0].science}</span></label> <br>
         <label><span> ${studentResult[0].biology} </span></label> <br>
           <label>
         <img src="${studentBio[0].profilePhotUrl}" width="50px" height="50px">
        </label>
        
        </div>
        </div>
    

    </div>
    `;

    res.send(html);
  } catch (err) {
    console.log(err);
  }
};

const getStudentsPost = async function (req, res) {};

const adminControls = {
  adminLogin,
  adminPortalGet,
  adminPortalPost,
  deleteStudent,
  updateResultGet,
  updateResultPost,
  getStudentsGet,
  getStudentsPost,
  poll,
};

export { adminControls };
