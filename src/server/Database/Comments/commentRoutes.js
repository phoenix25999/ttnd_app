const router = require('express').Router();
const commentController = require('./commentController');
const upload = require('../../middleware/commentMulter');

router.post('/comment/:buzzID', upload, commentController.addComment);
router.get('/comment/:buzzID', commentController.getComments);

router.post('/commentReply/:buzzID/:commentID', upload, commentController.addReply);
router.get('/commentReply/:commentID', commentController.getReplies);

module.exports = router;