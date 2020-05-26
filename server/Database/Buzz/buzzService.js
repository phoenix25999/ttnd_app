const Buzz = require('./buzzModel');

exports.addBuzz = (newBuzz) => {
  const buzz = Buzz.create(newBuzz);
  return buzz;
};

exports.getAllBuzz = async () => {
  const allBuzz = Buzz.find({});
  return allBuzz;
};