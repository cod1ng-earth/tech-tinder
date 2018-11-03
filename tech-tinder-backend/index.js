require("dotenv").config();
const express = require("express");
const expressLogging = require("express-logging");
const logger = require("logops");
const cors = require("cors");

const technology = require("./technology");

const app = express();
app.use(expressLogging(logger));

app.use(cors());
app.options("*", cors());

const port = process.env.PORT || 3000;

app.use("/technology", technology);

app.use((req, res, next) => {
  res.status(404).json({ status: "resource not found" });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("That was bad!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
