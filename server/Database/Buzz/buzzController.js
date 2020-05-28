const buzzService = require('./buzzService');

exports.addBuzz = async (req, res) => {
  let newBuzz = {
    description: req.body.desc,
    category: req.body.category
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