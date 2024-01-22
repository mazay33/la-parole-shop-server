const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./UserModel');

const Token = sequelize.define('token', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = Token;
