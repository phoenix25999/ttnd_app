const buzzService = require('./buzzService');

exports.addBuzz = async (req, res) => {
  console.log(req.body);
  let newBuzz = {
    description: req.body.desc,
    category: req.body.category,
    createdBy: req.body.email,
    image: req.body.image
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