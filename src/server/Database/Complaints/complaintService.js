const Complaint = require('./complaintModel');

exports.addComplaint = (newComplaint) => {
  
  const complaint = Complaint.insertMany(newComplaint);
  return complaint;
};

exports.getAllComplaint = async ( department, sortBy, pageNo ) => {
  let allComplaint = '';
  if( department ){
     allComplaint = await Complaint.find({department: department})
                                    .populate('assignedTo', 'name');
  }

  else if(sortBy){
    allComplaint = await Complaint.find({})
                                  .populate('assignedTo', 'name')
                                  .sort({createdOn: sortBy})
  }

  else{
    allComplaint = Complaint.find({})
                            .skip((pageNo-1)*10)
                            .limit(10)
                            .populate('assignedTo', 'name');
  }
  return allComplaint;
};

exports.getComplaintByUser = async ( email, category, sortBy, pageNo ) => {
  let userComplaint = '';
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
                              .skip((pageNo-1)*10)
                              .limit(10)
                              .populate('assignedTo', 'name');
  }
  return userComplaint;
};

exports.getAssignedComplaints = async ( adminId ) => {
  const userComplaint = Complaint.find({assignedTo: adminId});
  return userComplaint;
};

exports.updateStatus = async (complaintID, updates) => {
  if(!updates.status){
    updates={
      ...updates,
      status: 'In Progress'
    };
  }

  const updatedInfo = Complaint.findOneAndUpdate({_id: complaintID}, updates)
                                .populate('assignedTo', 'name');
  return updatedInfo;
}