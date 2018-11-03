exports = function(technologyId){

  const collection = context.services.get("mongodb-atlas").db("tech-tinder").collection("technology");
  const res = collection.findOne({_id: BSON.ObjectId(technologyId)});
  
  return { res };

};