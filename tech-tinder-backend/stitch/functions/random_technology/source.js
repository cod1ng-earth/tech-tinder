exports = function(){
  
  const collection = context.services.get('mongodb-atlas').db('tech-tinder').collection('technology');
  
  return new Promise( (resolve, reject) => {
      const res = collection.aggregate([{ $sample: { size: 1 } }]);
      res.next().then(n => {
        resolve({id:n._id.toString()});
      });
  });
};