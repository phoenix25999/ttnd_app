const Complaint = require('./complaintModel');

exports.addComplaint = (newComplaint) => {
  
  const complaint = Complaint.insertMany(newComplaint);
  return complaint;
};

exports.getAllComplaint = async () => {
  const allComplaint = Complaint.find({})
                                .populate('assignedTo', 'name');
  return allComplaint;
};

exports.getComplaintByUser = async ( email, category, sortBy ) => {
  let userComplaint = '';
  console.log(email, category, sortBy);
  if(category){
     userComplaint = await Complaint.find({email: email, department: category})
                                .populate('assignedTo', 'name');
  }

  else if(sortBy){
    userComplaint = await Complaint.find({email: email})
                                .populate('assignedTo', 'name')
                                .sort({createdOn: sortBy})
  }

  else{
    userComplaint = Complaint.find({email: email})
                              .populate('assignedTo', 'name');
  }
  return userComplaint;
};

exports.getAssignedComplaints = async ( adminId ) => {
  const userComplaint = Complaint.find({assignedTo: adminId});
  return userComplaint;
};

exports.updateStatus = async (complaintID, updates) => {
  const updatedInfo = Complaint.updateOne({_id: complaintID}, updates);
  return updatedInfo;
}