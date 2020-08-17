const router = require('express').Router();
const complaintController = require('./complaintController');
const upload = require('../../middleware/complaintMulter');

router.get('/complaint', complaintController.getAllComplaint);
router.get('/complaint/:email', complaintController.getComplaintByUser);
router.get('/complaint/assigned/:adminId', complaintController.getAssignedComplaints);
router.post('/complaint',upload, complaintController.addComplaint);
router.patch('/complaint/:id', complaintController.updateComplaint);

module.exports = router;