const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  activationLink: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
