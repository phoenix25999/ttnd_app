const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['Activity', 'Lost and Found']
    },
    image: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;