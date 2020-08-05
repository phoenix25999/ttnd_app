const cloudinary = require('cloudinary');

exports.upload = async (files) => {
    let imagePath = []
        files.map(async image=>{
            const result = await cloudinary.v2.uploader.upload(image.path);
            imagePath.push(result.secure_url);
            console.log(imagePath)
        });
        
        return imagePath;
}