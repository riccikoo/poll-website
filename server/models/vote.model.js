const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vote = sequelize.define("Vote", {
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ChoiceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, { timestamps: true });

module.exports = Vote;
