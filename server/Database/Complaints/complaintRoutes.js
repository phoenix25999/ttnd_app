const router = require('express').Router();
const complaintController = require('./complaintController');

router.get('/complaint', complaintController.getAllComplaint);
router.post('/complaint', complaintController.addComplaint);

module.exports = router;