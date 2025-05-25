const express = require("express");
const cors = require("cors");
const { sequelize } = require("./server/models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Polling API Ready"));

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });

// Routes
app.use("/api/auth", require("./server/routes/auth.routes"));
app.use("/api/user", require("./server/routes/user.routes"));
app.use("/api/polls", require("./server/routes/poll.routes"));
app.use("/api/polls", require("./server/routes/choice.routes"));
app.use("/api/votes", require("./server/routes/vote.routes"));

