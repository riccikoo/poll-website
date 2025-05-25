const sequelize = require("../config/db");
const User = require("./user.model");
const Poll = require("./poll.model");
const Choice = require("./choice.model");
const Vote = require("./vote.model");

// Relasi
User.hasMany(Poll, { foreignKey: 'UserId', onDelete: 'SET NULL' });
Poll.belongsTo(User, { foreignKey: 'UserId' });

Poll.hasMany(Choice, { foreignKey: 'PollId', onDelete: 'CASCADE' });
Choice.belongsTo(Poll, { foreignKey: 'PollId' });

Choice.hasMany(Vote, { foreignKey: 'ChoiceId', onDelete: 'CASCADE' });
Vote.belongsTo(Choice, { foreignKey: 'ChoiceId' });

User.hasMany(Vote, { foreignKey: 'UserId', onDelete: 'CASCADE' });
Vote.belongsTo(User, { foreignKey: 'UserId' });

module.exports = {
  sequelize,
  User,
  Poll,
  Choice,
  Vote,
};
