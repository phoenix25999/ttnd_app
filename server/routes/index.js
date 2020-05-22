const router = require('express').Router();
const tokenVerify = require('../middleware/tokenVerify.middleware');

router.get('/', tokenVerify, (req, res)=> {
    console.log(req);
    res.send({status: true, name: req.user.userName});
    console.log(req.user);
});

module.exports = router;