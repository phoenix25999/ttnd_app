const Complaint = require('./complaintModel');

exports.addComplaint = (newComplaint) => {
  const complaint = Complaint.create(newComplaint);
  return complaint;
};

exports.getAllComplaint = async () => {
  const allComplaint = Complaint.find({});
  return allComplaint;
};