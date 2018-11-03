require("dotenv").config();
const client = require("../stitch-client.js");
const users = require("./fake-users");

const votes = ["interested", "discouraged", "evaluating", "using"];

const fakeVotes = (technologies, fakeCount) => {
  let promises = [];
  let user, tech;

  for (let i = fakeCount; i-- > 0; ) {
    userName = users[Math.floor(Math.random() * users.length)];
    tech = technologies[Math.floor(Math.random() * technologies.length)];
    opinion = votes[Math.floor(Math.random() * votes.length)];

    console.log(`${tech._id}: ${userName} -> ${opinion}`);

    promises.push(
      client.callFunction("technology_vote", [
        tech._id.toString(),
        opinion,
        userName
      ])
    );
  }
  return promises;
};

client.callFunction("technologies").then(res => {
  const ps = fakeVotes(res.technologies, 150);
  Promise.all(ps).then(r => {
    console.log("all done");
  });
});
