exports = function(technologyId){
  const colTech = context.services.get("mongodb-atlas").db("tech-tinder").collection("technology");
  const colVotes = context.services.get("mongodb-atlas").db("tech-tinder").collection("votes");
  
  const techId = BSON.ObjectId(technologyId);
  
  return new Promise( (resolve, reject) => {
    let technology = colTech.findOne({_id: techId});
    colVotes.aggregate(
      [
        { $group: { 
            _id: "$op",
            count: { $sum: 1 }
          } 
        }
      ]).toArray().then(ag => {
        resolve({
          technology,
          stats: ag
        });
      });
  });
};
