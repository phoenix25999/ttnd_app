const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    department: {
        type:String,
        required: true,
        enum: ['Hardware', 'Infrastructure', 'Others']
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
    }
})

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;