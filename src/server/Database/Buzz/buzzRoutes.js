const router = require('express').Router();
const buzzController = require('./buzzController');
const upload = require('../../middleware/buzzMulter');
const checkAuth=require('../../middleware/checkAuth');


router.get('/buzz', checkAuth,  buzzController.getAllBuzz);
router.get('/buzz/:userID', buzzController.getBuzzByUser);
router.post('/buzz',upload, buzzController.addBuzz);
router.put('/buzz/like', buzzController.updateLikes);
router.put('/buzz/dislike', buzzController.updateDislikes);

module.exports = router;