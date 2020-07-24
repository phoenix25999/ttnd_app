const buzzService = require('./buzzService');
const cloudinary = require('cloudinary');


exports.addBuzz = async (req, res) => {
  let imagePath = req.files.map(image=>image.path);
  let newBuzz = {
    description: req.body.description,
    category: req.body.category,
    createdBy: req.body.userID,
    image:  imagePath
  };

  if(req.files.length){
    
    let imagePath = [];
    req.files.map(async image=>{
      const result = await cloudinary.v2.uploader.upload(image.path);
      console.log('Path of image 18');
      imagePath.push(result.secure_url)
      console.log(imagePath); // prints the path correctly
      console.log('Path of image 21');
      newBuzz = {
        ...newBuzz,
        image: imagePath
      }
    });  
    
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
  try {
    const allBuzz = await buzzService.getAllBuzz();
    res.send(allBuzz);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.getBuzzByUser = async (req, res) => {
  try {
    const allBuzz = await buzzService.getBuzzByUser(req.params.userID);
    res.send(allBuzz);
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