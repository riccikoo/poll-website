const { Poll, User } = require("../models");

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.findAll({ include: User });
    res.json(polls);
  } catch (err) {
    console.error("Get all polls error:", err);
    res.status(500).json({ error: "Failed to get polls" });
  }
};

exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id, { include: User });
    if (!poll) return res.status(404).json({ error: "Poll not found" });
    res.json(poll);
  } catch (err) {
    console.error("Get poll by id error:", err);
    res.status(500).json({ error: "Failed to get poll" });
  }
};

exports.createPoll = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    const poll = await Poll.create({ question, UserId: userId });
    res.status(201).json(poll);
  } catch (err) {
    console.error("Create poll error:", err);
    res.status(500).json({ error: "Failed to create poll" });
  }
};

exports.updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    if (poll.UserId !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    poll.question = req.body.question || poll.question;
    await poll.save();

    res.json({ message: "Poll updated", poll });
  } catch (err) {
    console.error("Update poll error:", err);
    res.status(500).json({ error: "Failed to update poll" });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByPk(req.params.id);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    if (poll.UserId !== req.user.id)
      return res.status(403).json({ error: "Forbidden" });

    await poll.destroy();
    res.json({ message: "Poll deleted" });
  } catch (err) {
    console.error("Delete poll error:", err);
    res.status(500).json({ error: "Failed to delete poll" });
  }
};
