const buzzService = require('./buzzService');


exports.addBuzz = async (req, res) => {
  let imagePath = req.files.map(image=>image.path);
  let newBuzz = {
    description: req.body.description,
    category: req.body.category,
    createdBy: req.body.userID,
    image:  imagePath
  };
  try {
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
    const allBuzz = await buzzService.getBuzzByUser(req.params.email);
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