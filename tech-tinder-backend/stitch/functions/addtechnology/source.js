exports = function(technology){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  const collection = context.services.get("mongodb-atlas").db("tech-tinder").collection("technology");
  return new Promise( (resolve, reject) => {
    collection.insertOne(technology).then(result => {
      resolve(result);
   });
  });
  
};