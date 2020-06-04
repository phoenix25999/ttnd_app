import React from 'react'
import NewComplaint from './NewComplaint/NewComplaint';
import YourComplaints from './YourComplaints/YourComplaints';

const Complaint = () => {
  window.document.title='Complaints';
  return (
    <div> 
      <NewComplaint />
      <YourComplaints />
    </div>
  );
}

export default Complaint;