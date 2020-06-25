const router = require('express').Router();
const tokenVerify = require('../../../middleware/tokenVerify.middleware');
const userController = require('../userController');

router.get('/', tokenVerify, (req, res)=> {
    res.send({status: true, name: req.user.userName, email: req.user.email});
});
router.get('/user/role/:email', userController.getUserRole);
router.get('/user/:email', userController.getUserName);

module.exports = router;