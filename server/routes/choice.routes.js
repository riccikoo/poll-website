const express = require("express");
const router = express.Router();
const choiceController = require("../controllers/choice.controller");

router.post("/:pollId/choices", choiceController.addChoice);

router.get("/:pollId/choices", choiceController.getChoices);

module.exports = router;
