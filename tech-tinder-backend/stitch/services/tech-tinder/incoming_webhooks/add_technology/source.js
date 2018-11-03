// Try running in the console below.
  
exports = function(payload) {
  var queryArg = payload.query.arg || '';
  var body = {};
  if (payload.body) {
    body = EJSON.parse(payload.body.text());
  }
  return queryArg + ' ' + body.msg;
};