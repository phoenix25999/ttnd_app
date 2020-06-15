const Complaint = require('./complaintModel');

exports.addComplaint = (newComplaint) => {
  const complaint = Complaint.create(newComplaint);
  return complaint;
};

exports.getAllComplaint = async () => {
  const allComplaint = Complaint.find({});
  return allComplaint;
};

exports.getComplaintByUser = async ( email ) => {
  const userComplaint = Complaint.find({email: email});
  return userComplaint;
};

exports.updateStatus = async (statusInfo) => {
  console.log(statusInfo)
  const complaintStatus = Complaint.updateOne({_id: statusInfo.id}, {status: statusInfo.status});
  return complaintStatus;
}