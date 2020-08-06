const mongoose = require('mongoose');

const resolverSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department:{
        type: String,
        enum: ['Infra', 'IT', 'Others']
    }
})

const userModel = mongoose.model('Resolver', resolverSchema);

module.exports = userModel;