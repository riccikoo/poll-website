const { Choice, Poll } = require("../models");

exports.addChoice = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { text } = req.body;

    const poll = await Poll.findByPk(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    const choice = await Choice.create({ text, PollId: pollId });
    res.status(201).json({ message: "Choice added", choice });
  } catch (err) {
    console.error("Add choice error:", err);
    res.status(500).json({ error: "Failed to add choice" });
  }
};

exports.getChoices = async (req, res) => {
  try {
    const { pollId } = req.params;
    const choices = await Choice.findAll({ where: { PollId: pollId } });
    res.json(choices);
  } catch (err) {
    console.error("Get choices error:", err);
    res.status(500).json({ error: "Failed to fetch choices" });
  }
};
