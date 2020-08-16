const buzzService = require('./buzzService');
const cloudinary = require('cloudinary');

exports.addBuzz = async (req, res) => {

  let newBuzz = {
    description: req.body.description,
    category: req.body.category,
    createdBy: req.body.userID,
  };


  if(req.files.length){
    
    let imagePath = [];
    req.files.map(async image=>{
      const result = await cloudinary.v2.uploader.upload(image.path);
      console.log('Path of image 18');
      imagePath.push(result.secure_url)
      console.log(imagePath);
    
    });
    newBuzz = {
      ...newBuzz,
      image: imagePath
    }
    console.log(newBuzz);
    
  }

  try {
    console.log('Path 31');
    console.log(newBuzz); //prints empty array in image field
    const buzz = await buzzService.addBuzz(newBuzz);
    res.send(buzz);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.getAllBuzz = async (req, res) => {
  console.log(req.body);
  try {
    const allBuzz = await buzzService.getAllBuzz(req.body);
    res.send(allBuzz);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.getBuzzCountByUser = async (req, res) => {
  try {
    const buzzCount = await buzzService.getBuzzCountByUser(req.params.userID);
    let buzzCountObj =  {
      count: buzzCount
    }
    res.send(buzzCountObj);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.updateLikes = async (req, res) => {
  try {
    const likeInfo = await buzzService.updateLikes(req.body);
    res.send(likeInfo);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.updateDislikes = async (req, res) => {
  
  try {
    const dislikeInfo = await buzzService.updateDislikes(req.body);
    res.send(dislikeInfo);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.updateBuzz = async (req, res) => {
  try{
    const updatedBuzz = await buzzService.updateBuzz(req.params.buzzId, req.body);
    res.send(updatedBuzz);
  } catch(err){
    res.status(400).send(err);
  }
}

exports.deleteBuzz = async (req, res) => {
  try{
    const deletedBuzz = await buzzService.deleteBuzz(req.params.buzzId);
    res.send(deletedBuzz);
  } catch(err){
    res.status(400).send(err);
  }
}