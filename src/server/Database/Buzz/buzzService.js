const Buzz = require('./buzzModel');

exports.addBuzz = async (newBuzz) => {
  
  const buzz = Buzz.create(newBuzz);
  return buzz;
};

exports.getAllBuzz = async ( condition ) => {
  let allBuzz = '';
  if(condition.category){
    allBuzz = Buzz.find({category: condition.category})
                  .populate('createdBy','name email')
                  .sort({createdOn: -1});
  }

  else if(condition.pageNo){
    allBuzz = Buzz.find({})
                  .skip(3*(condition.pageNo-1))
                  .limit(3)
                  .populate('createdBy','name email')
                  .sort({createdOn: -1});
  }

  else{
    allBuzz = Buzz.find({})
                  .limit(3)
                  .populate('createdBy','name email')
                  .sort({createdOn: -1});
  }
  

  return allBuzz;
};

exports.getBuzzCountByUser = async ( userID ) => {
  const buzzCount = Buzz.countDocuments({createdBy: userID});
  return buzzCount;
};

exports.updateLikes = async ({id, likes, alreadyDisliked}) => {
  let updatedLikes;
  if(alreadyDisliked){
    updatedLikes = Buzz.updateOne({_id: id}, {$pull:{dislikes: likes}, $push:{likes: likes}});
  }
  else{
    updatedLikes = Buzz.updateOne({_id: id}, {$push:{likes: likes}});
  }
  return updatedLikes;
}

exports.updateDislikes = async ({id, dislikes, alreadyLiked}) => {
  let updatedDislikes;
  if(alreadyLiked){
    updatedDislikes = Buzz.updateOne({_id: id}, {$pull:{likes: dislikes}, $push:{dislikes: dislikes}});
  }
  else{
    updatedDislikes = Buzz.updateOne({_id: id}, {$push:{dislikes: dislikes}});
  }
  return updatedDislikes;
}

exports.updateBuzz = (buzzId, buzzDetails) => {
  const updatedBuzz = Buzz.updateOne({_id: buzzId}, buzzDetails);
  return updatedBuzz;
}

exports.deleteBuzz = ( buzzId ) => {
  const deletedBuzz = Buzz.deleteOne({_id: buzzId});
  return deletedBuzz;
}