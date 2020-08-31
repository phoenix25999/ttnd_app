const complaintService = require('./complaintService');

exports.addComplaint = async (req, res) => {
  let attachmentPath = req.files.map(image=>image.path);
  let issueId = '';
  if(req.body.department==='Hardware'){
    issueId = `HW${Date.now()}`;
  }
  if(req.body.department==='Infra'){
    issueId = `IN${Date.now()}`;
  }
  if(req.body.department==='Other'){
    issueId = `OT${Date.now()}`;
  }
  let newComplaint = {
    issueId: issueId,
    department: req.body.department,
    title: req.body.title,
    name: req.body.name,
    email: req.body.email,
    concern: req.body.concern,
    attachment: attachmentPath
  };
  try {
    const complaint = await complaintService.addComplaint(newComplaint);
    res.send(complaint);
  } catch (err) {
    res.status(400).send(err);
  }
}

exports.getAllComplaint = async (req, res) => {
  try {
    const allComplaint = await complaintService.getAllComplaint(req.query.department, req.query.sortBy);
    res.send(allComplaint);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.getComplaintByUser = async (req, res) => {
  try {
    const userComplaint = await complaintService.getComplaintByUser(req.params.email, req.query.category, req.query.sortBy);
    console.log(userComplaint);
    res.send(userComplaint);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.getAssignedComplaints = async (req, res) => {

  try {
    const userComplaint = await complaintService.getAssignedComplaints(req.params.adminId);
    res.send(userComplaint);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const updatedInfo = await complaintService.updateStatus(req.params.id, req.body);
    res.send(updatedInfo);
  } catch (err) {
    res.status(400).send(err);
  }
};
