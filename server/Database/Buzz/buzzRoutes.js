const router = require('express').Router();
const buzzController = require('./buzzController');

router.get('/buzz', buzzController.getAllBuzz);
router.post('/buzz', buzzController.addBuzz);
router.post('/buzz/like', buzzController.updateLikes);

module.exports = router;