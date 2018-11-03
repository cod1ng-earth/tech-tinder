exports = function(technologyId){
  const colTech = context.services.get("mongodb-atlas").db("tech-tinder").collection("technology");
  const colVotes = context.services.get("mongodb-atlas").db("tech-tinder").collection("votes");
  
  const aggregationPipeline = [
      {"$group": {
          "_id": { tech: "$ref", opinion: "$op" },
           "total": { "$sum": 1  }
        }
      },

      {"$group": {
          "_id": "$_id.tech",
          "count": {"$sum": "$total"},
          "stats": {
              "$push": {
                  op: "$_id.opinion",
                  total: "$total"
                  }
              }
          }
      }
  ];
  
  var pipeline;
  if (technologyId) {
    pipeline = [{$match:{ref: BSON.ObjectId(technologyId)} }]
      .concat(aggregationPipeline);
  } else {
    pipeline = aggregationPipeline;
  }
  
  return new Promise( (resolve, reject) => {
    //let technology = colTech.findOne({_id: techId});
    colVotes.aggregate(pipeline).toArray().then(ag => {
        const techIds = ag.map(agg => agg._id); //stitch doesnt support $lookup
        colTech.find({_id: {"$in": techIds} }).toArray().then(technologies => {
          
          const combined = ag.map(agg => {
            let base = technologies.filter(tt => {
                return tt._id.toString() == agg._id.toString();
              })[0];
              if (!base) {
                return null;
              }
            base.votes = {
              total: agg.count,
              results: {}
            };
            agg.stats.forEach(s => base.votes.results[s.op] = s.total );
            
            return base;
          });
          resolve(combined.filter(c => c != null));
        });
      });
  });
};
