const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Polling API Ready"));

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
}).catch(err => {
  console.error("DB connection failed:", err);
});