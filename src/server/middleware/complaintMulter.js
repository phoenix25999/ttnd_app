const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "./complaintUploads",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
 }).array('attachment', 10);

 module.exports = upload;