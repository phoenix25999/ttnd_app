const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    issueId: {
        type: String,
        required: true
    },
    department: {
        type:String,
        required: true,
        enum: ['Hardware', 'Infra', 'Other']
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    concern:{
        type: String,
        required:true
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    attachment: {
        type: Array
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;