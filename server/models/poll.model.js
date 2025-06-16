const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Poll = sequelize.define("Poll", {
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Poll;
