const { Stitch, AnonymousCredential } = require("mongodb-stitch-server-sdk");

const stitchAppId = process.env.STITCH_APP_ID;
const client = Stitch.initializeDefaultAppClient(stitchAppId);

client.auth
  .loginWithCredential(new AnonymousCredential())
  .then(user => {
    client.close();
  })
  .catch(err => {
    client.close();
  });

module.exports = client;
