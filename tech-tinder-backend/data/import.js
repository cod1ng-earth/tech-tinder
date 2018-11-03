require("dotenv").config();
const client = require("../stitch-client.js");
const csv = require("csvtojson");

//get data from https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/edit#gid=0
const csvFilePath = "./data/thoughtworks15.csv";

/*
 * use this to test it.
function store(obj) {
  return new Promise((resolve, reject) => {
    console.log(obj);
    resolve(obj);
  });
}*/

const users = ["Thoughtworks", "Jan", "Robert", "Stefan", "Pranav"];

csv()
  .fromFile(csvFilePath)
  .then(jsonData => {
    const promises = jsonData.map(jsonObj => {
      const user = users[Math.floor(Math.random() * users.length)];

      const technology = {
        name: jsonObj.name,
        description: jsonObj.description,
        category: jsonObj.quadrant,
        user: { name: user }
      };
      return client.callFunction("addtechnology", [technology]);
      //return store(technology);
    });

    Promise.all(promises).then(res => {
      console.log("all done");
    });
  });
