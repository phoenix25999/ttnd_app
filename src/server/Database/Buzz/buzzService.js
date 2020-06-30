const Buzz = require('./buzzModel');

exports.addBuzz = async (newBuzz) => {
  
  const buzz = Buzz.create(newBuzz);
  return buzz;
};

exports.getAllBuzz = async () => {
  const allBuzz = Buzz.find({})
                  .populate('createdBy','name email');
  return allBuzz;
};

exports.getBuzzByUser = async ( email ) => {
  const allBuzz = Buzz.find({createdBy: email})
                  .populate('createdBy','name email');
  return allBuzz;
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