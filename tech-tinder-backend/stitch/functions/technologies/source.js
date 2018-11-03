exports = function(){

  const collection = context.services.get("mongodb-atlas").db("tech-tinder").collection("technology");
  const res = collection.find({}).toArray();
  
  return {technologies: res};
};