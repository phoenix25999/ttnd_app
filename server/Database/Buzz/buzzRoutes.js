const router = require('express').Router();
const buzzController = require('./buzzController');

router.get('/buzz', buzzController.getAllBuzz);
router.post('/buzz', buzzController.addBuzz);

module.exports = router;