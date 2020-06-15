const router = require('express').Router();
const buzzController = require('./buzzController');

router.get('/buzz', buzzController.getAllBuzz);
router.post('/buzz', buzzController.addBuzz);
router.put('/buzz/like', buzzController.updateLikes);
router.put('/buzz/dislike', buzzController.updateDislikes);

module.exports = router;