const Buzz = require('./buzzModel');

exports.addBuzz = async (newBuzz) => {
  
  const buzz = Buzz.create(newBuzz);
  return buzz;
};

exports.getAllBuzz = async ( filter ) => {
  console.log(filter);
  const allBuzz = Buzz.find(filter)
                  .populate('createdBy','name email');
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