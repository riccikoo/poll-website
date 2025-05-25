const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Choice = sequelize.define("Choice", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "choice_text", // mapping ke kolom choice_text di DB
  },
}, {
  timestamps: true,
});

module.exports = Choice;