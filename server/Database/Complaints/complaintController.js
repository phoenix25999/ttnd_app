const complaintService = require('./complaintService');

exports.addComplaint = async (req, res) => {
  let newComplaint = {
    department: req.body.department,
    title: req.body.title,
    name: req.body.name,
    email: req.body.email,
    concern: req.body.concern
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