const router = require('express').Router();
const commentController = require('./commentController');

router.post('/comment/:buzzID', commentController.addComment);
router.get('/comment/:buzzID', commentController.getComments);

module.exports = router;