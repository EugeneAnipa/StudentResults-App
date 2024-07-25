import { Sequelize, DataTypes } from "sequelize";
import mysql from "mysql2/promise";

const sequelize = new Sequelize(
  process.env.SEQUELIZEDATABASE,
  process.env.SEQUELIZEUSER,
  process.env.SEQUELIZEPASSWORD,
  {
    host: process.env.SEQUELIZEHOST,

    dialect: "mysql",
  }
);

//verifying if db works
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const adminLogin = sequelize.define("adminLogin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const signUpModel = sequelize.define("signUpModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

/*
const biodataModel = sequelize.define("biodataModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  DOB: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Address: {
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  profilePhotUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://picsum.photos/200/300",
  },
});


*/
const coursesGradesModel = sequelize.define("coursesGradesModel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  biology: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  mathematics: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  science: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  english: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
await sequelize.sync({ alter: true });

const databaseModels = {
  coursesGradesModel,

  signUpModel,
  adminLogin,
};

export { databaseModels };
