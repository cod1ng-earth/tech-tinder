exports = function(technologyId, opinion){
  const collection = context.services.get("mongodb-atlas").db("tech-tinder").collection("votes");
  const dt = new Date();
  
  return new Promise( (resolve, reject) => {
    collection.insertOne({
      created: dt,
      ref: BSON.ObjectId(technologyId),
      op: opinion  
    }).then(result => {
      resolve(result);
   });
  });
};