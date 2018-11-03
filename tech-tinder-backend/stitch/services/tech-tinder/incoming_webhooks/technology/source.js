// Try running in the console below.
  
exports = function() {
  /*var queryArg = payload.query.arg || '';
  var body = {};
  if (payload.body) {
    body = EJSON.parse(payload.body.text());
  }*/
  
  const resultFromFunction = context.functions.execute("jansfunction", 42);
  
  return resultFromFunction;
  //return "waht"
};