const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Vote = sequelize.define("Vote", {}, { timestamps: true });

module.exports = Vote;
