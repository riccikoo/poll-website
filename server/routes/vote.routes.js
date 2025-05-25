const express = require("express");
const router = express.Router();
const voteController = require("../controllers/vote.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, voteController.submitVote);

module.exports = router;
