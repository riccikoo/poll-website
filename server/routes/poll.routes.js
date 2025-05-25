const express = require("express");
const router = express.Router();
const pollController = require("../controllers/poll.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", pollController.getAllPolls);
router.get("/:id", pollController.getPollById);
router.post("/", auth, pollController.createPoll);
router.put("/:id", auth, pollController.updatePoll);
router.delete("/:id", auth, pollController.deletePoll);

module.exports = router;
