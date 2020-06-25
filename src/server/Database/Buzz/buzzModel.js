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
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    }
})

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;