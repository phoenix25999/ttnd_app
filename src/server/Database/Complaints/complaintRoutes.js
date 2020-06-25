const router = require('express').Router();
const complaintController = require('./complaintController');
const upload = require('../../middleware/complaintMulter');

router.get('/complaint', complaintController.getAllComplaint);
router.get('/complaint/:email', complaintController.getComplaintByUser);
router.post('/complaint',upload, complaintController.addComplaint);
router.put('/complaint/updateStatus', complaintController.updateStatus);

module.exports = router;