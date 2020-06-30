const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['Activity', 'Lost and Found']
    },
    image: {
        type: Array
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;