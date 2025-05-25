const { Vote, Choice, Poll } = require("../models");

exports.submitVote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { choiceId } = req.body;

    // Cari pilihan dan pastikan valid
    const choice = await Choice.findByPk(choiceId, {
      include: Poll
    });

    if (!choice) {
      return res.status(404).json({ error: "Choice not found" });
    }

    const pollId = choice.Poll.id;

    const existingVote = await Vote.findOne({
      where: { UserId: userId },
      include: {
        model: Choice,
        where: { PollId: pollId }
      }
    });

    if (existingVote) {
      return res.status(403).json({ error: "You have already voted on this poll" });
    }

    const vote = await Vote.create({
      UserId: userId,
      ChoiceId: choiceId
    });

    res.status(201).json({ message: "Vote submitted", vote });
  } catch (err) {
    console.error("Vote error:", err);
    res.status(500).json({ error: "Failed to submit vote" });
  }
};
