const { Poll, Choice, Vote, User } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

exports.getSummary = async (req, res) => {
  try {
    // Total Polls
    const totalPolls = await Poll.count();
    // Total Votes
    const totalVotes = await Vote.count();
    // Total Users
    const totalUsers = await User.count();

    // Poll dengan vote terbanyak & paling sedikit
    const pollsWithVoteCount = await Poll.findAll({
      include: {
        model: Choice,
        include: [Vote]
      }
    });
    let mostVotedPoll = null;
    let leastVotedPoll = null;
    let maxVotes = -1;
    let minVotes = Number.MAX_SAFE_INTEGER;
    pollsWithVoteCount.forEach(poll => {
      const voteCount = poll.Choices.reduce((sum, c) => sum + (c.Votes ? c.Votes.length : 0), 0);
      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        mostVotedPoll = { id: poll.id, question: poll.question, votes: voteCount };
      }
      if (voteCount < minVotes) {
        minVotes = voteCount;
        leastVotedPoll = { id: poll.id, question: poll.question, votes: voteCount };
      }
    });

    // Votes per Choice (untuk bar/pie chart, ambil dari poll pertama jika ada)
    let votesPerChoice = [];
    if (pollsWithVoteCount.length > 0) {
      const poll = pollsWithVoteCount[0];
      votesPerChoice = poll.Choices.map(choice => ({
        choice: choice.text,
        votes: choice.Votes ? choice.Votes.length : 0
      }));
    }

    // Votes Over Time (Line Chart)
    const votesOverTimeRaw = await Vote.findAll({
      attributes: [
        [fn('DATE', col('createdAt')), 'date'],
        [fn('COUNT', col('id')), 'votes']
      ],
      group: [literal('date')],
      order: [[literal('date'), 'ASC']]
    });
    const votesOverTime = votesOverTimeRaw.map(row => ({
      date: row.get('date'),
      votes: parseInt(row.get('votes'))
    }));

    // Vote Target Percent (Gauge) - misal target 100 votes
    const voteTargetPercent = totalVotes / 100;

    res.json({
      totalPolls,
      totalVotes,
      totalUsers,
      mostVotedPoll,
      leastVotedPoll,
      votesPerChoice,
      votesOverTime,
      voteTargetPercent
    });
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ error: 'Failed to get analytics summary' });
  }
}; 