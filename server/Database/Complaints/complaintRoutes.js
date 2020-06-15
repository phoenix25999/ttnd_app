const router = require('express').Router();
const complaintController = require('./complaintController');

router.get('/complaint', complaintController.getAllComplaint);
router.post('/complaint', complaintController.addComplaint);
router.put('/complaint/updateStatus', complaintController.updateStatus);

module.exports = router;