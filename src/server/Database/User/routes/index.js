const router = require('express').Router();
const tokenVerify = require('../../../middleware/tokenVerify.middleware');
const userController = require('../userController');

router.get('/', tokenVerify, (req, res)=> {
    res.send({status: true, name: req.user.userName, email: req.user.email});
});
router.get('/user/:email', userController.getUserDetails);
router.patch('/user/:userID', userController.updateProfile);

router.post('/user', userController.addUser);
router.get('/users/:userID', userController.getAllUsersDetails);
router.patch('/user/:userID', userController.updateProfile);
router.delete('/user/:userID', userController.deleteUser);


module.exports = router;