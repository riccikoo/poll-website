const sequelize = require("../config/db");
const User = require("./user.model");
const Poll = require("./poll.model");
const Choice = require("./choice.model");
const Vote = require("./vote.model");

// Relasi
User.hasMany(Poll);
Poll.belongsTo(User);

Poll.hasMany(Choice, { onDelete: 'CASCADE' });
Choice.belongsTo(Poll);

Choice.hasMany(Vote, { onDelete: 'CASCADE' });
Vote.belongsTo(Choice);

User.hasMany(Vote, { onDelete: 'CASCADE' });
Vote.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Poll,
  Choice,
  Vote,
};
