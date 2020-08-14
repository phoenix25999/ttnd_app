const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "./profilePics",
    filename: function(req, file, cb){
        console.log('file', file);
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single('profilePic');

 module.exports = upload;