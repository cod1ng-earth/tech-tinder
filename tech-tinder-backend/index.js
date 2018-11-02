require("dotenv").config();
const express = require("express");
const expressLogging = require("express-logging");
const logger = require("logops");
const jsonParser = require("body-parser").json();
const cors = require("cors");

const client = require("./stitch-client.js");

const app = express();
app.use(expressLogging(logger));
app.use(cors());
app.options("*", cors());

const port = process.env.PORT || 3000;

app.get("/technology", function(req, res) {
  client
    .callFunction("technologies", [null])
    .then(result => {
      res.json(result);
    })
    .catch(e => logger.fatal(e));
});

app.post("/technology", jsonParser, (req, res) => {
  const technology = req.body;
  client.callFunction("addtechnology", [technology]).then(result => {
    res.json({
      result: "created",
      id: result.insertedId
    });
  });
});

app.use((req, res, next) => {
  res.status(404).json({ status: "resource not found" });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("That was bad!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
