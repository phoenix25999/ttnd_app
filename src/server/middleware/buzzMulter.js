const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if(!file.mimetype.match(/jpg|jpeg|png|gif|svg|$i/)){
      cb(new Error('File format not supported'), false);
    }

    cb(null, true) // If mime type validation is successfull
  }
});