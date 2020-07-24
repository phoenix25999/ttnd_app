const router = require('express').Router();
const commentController = require('./commentController');

router.post('/comment/:buzzID', commentController.addComment);
router.get('/comment/:buzzID', commentController.getComments);

router.post('/commentReply/:buzzID/:commentID', commentController.addReply);
router.get('/commentReply/:commentID', commentController.getReplies);

module.exports = router;