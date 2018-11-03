var faker = require("faker");

let users = [];
for (let i = 100; i-- > 0; ) {
  users.push(faker.internet.userName());
}

module.exports = users;
