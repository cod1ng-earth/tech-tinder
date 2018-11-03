const express = require("express");
const jsonParser = require("body-parser").json();
const router = express.Router();

const client = require("./stitch-client.js");

const allowedOpinions = ["interested", "discouraged", "evaluating", "using"];

router.get("/", function(req, res) {
  client
    .callFunction("technologies", [null])
    .then(result => {
      res.json(result);
    })
    .catch(e => logger.fatal(e));
});

router.post("/", jsonParser, (req, res) => {
  const technology = req.body;
  client.callFunction("addtechnology", [technology]).then(result => {
    res.json({
      result: "created",
      id: result.insertedId
    });
  });
});

router.get("/random", (req, res) => {
  client.callFunction("random_technology", [null]).then(result => {
    res.redirect("/technology/" + result.id);
  });
});

router.get("/stats", (req, res) => {
  client.callFunction("technology_aggregate", []).then(result => {
    res.json({
      result
    });
  });
});

router.get("/:technologyId", (req, res) => {
  client
    .callFunction("gettechnology", [req.params.technologyId])
    .then(result => {
      res.json({
        result
      });
    });
});

router.get("/:technologyId/stats", (req, res) => {
  const promises = [
    client.callFunction("technology_aggregate", [req.params.technologyId]),
    client.callFunction("technology_get_votes", [req.params.technologyId])
  ];
  Promise.all(promises).then(allResults => {
    aggregate = allResults[0][0]; // not nice but... necessary?
    aggregate.users = allResults[1];
    res.json({
      aggregate
    });
  });
});

router.post("/:technologyId/vote", jsonParser, (req, res, next) => {
  const opinion = req.body.opinion;
  if (!allowedOpinions.includes(opinion)) {
    return next({
      msg: `${opinion} is not valid. Give one of ${allowedOpinions.join("|")}`
    });
  } else {
    client
      .callFunction("technology_vote", [
        req.params.technologyId,
        req.body.opinion,
        req.body.userName
      ])
      .then(result => {
        res.json({
          result
        });
      });
  }
});

module.exports = router;
