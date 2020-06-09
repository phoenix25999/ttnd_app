const router = require('express').Router();
const buzzController = require('./buzzController');

router.get('/buzz', buzzController.getAllBuzz);
router.post('/buzz', buzzController.addBuzz);
router.post('/buzz/like', buzzController.updateLikes);
router.post('/buzz/dislike', buzzController.updateDislikes);

module.exports = router;