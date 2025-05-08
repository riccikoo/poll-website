const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Choice = sequelize.define("Choice", {
  choice_text: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: false });

module.exports = Choice;
