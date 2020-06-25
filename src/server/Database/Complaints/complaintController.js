const complaintService = require('./complaintService');

exports.addComplaint = async (req, res) => {
  let attachmentPath = req.files.map(image=>image.path);
  let newComplaint = {
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
    const allComplaint = await complaintService.getAllComplaint();
    res.send(allComplaint);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.getComplaintByUser = async (req, res) => {
  try {
    const userComplaint = await complaintService.getComplaintByUser(req.params.email);
    res.send(userComplaint);
  } catch(err) {
    res.status(400).send(err);
  }
};

exports.updateStatus = async (req, res) => {
  let updatedStatus = {
    id: req.body.id,
    status: req.body.updatedStatus
  };
  try {
    const statusInfo = await complaintService.updateStatus(updatedStatus);
    res.send(statusInfo);
  } catch (err) {
    res.status(400).send(err);
  }
};
