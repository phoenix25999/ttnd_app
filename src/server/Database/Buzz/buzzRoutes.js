const router = require('express').Router();
const buzzController = require('./buzzController');
const buzzMulter = require('../../middleware/buzzMulter');
const checkAuth=require('../../middleware/checkAuth');


router.get('/buzz', checkAuth,  buzzController.getAllBuzz);
router.get('/buzz/:email', buzzController.getBuzzByUser);
router.post('/buzz',buzzMulter.array('myImage', 10), buzzController.addBuzz);
router.put('/buzz/like', buzzController.updateLikes);
router.put('/buzz/dislike', buzzController.updateDislikes);

module.exports = router;