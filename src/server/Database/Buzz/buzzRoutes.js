const router = require('express').Router();
const buzzController = require('./buzzController');
const upload = require('../../middleware/buzzMulter');


router.get('/buzz',  buzzController.getAllBuzz);
router.get('/buzzCount/:userID', buzzController.getBuzzCountByUser);
router.post('/buzz',upload, buzzController.addBuzz);
router.put('/buzz/like', buzzController.updateLikes);
router.put('/buzz/dislike', buzzController.updateDislikes);

module.exports = router;