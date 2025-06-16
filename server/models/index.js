const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./user.model');
const Poll = require('./poll.model');
const Choice = require('./choice.model');
const Vote = require('./vote.model');

const ChoiceModel = sequelize.define("Choice", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "choice_text", // mapping ke kolom choice_text di DB
  },
}, {
  timestamps: true,
});

User.hasMany(Poll, { foreignKey: 'UserId' });
Poll.belongsTo(User, { foreignKey: 'UserId' });

Poll.hasMany(Choice, { foreignKey: 'PollId' });
Choice.belongsTo(Poll, { foreignKey: 'PollId' });

Choice.hasMany(Vote, { foreignKey: 'ChoiceId' });
Vote.belongsTo(Choice, { foreignKey: 'ChoiceId' });

User.hasMany(Vote, { foreignKey: 'UserId' });
Vote.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Poll, Choice, Vote, sequelize };
