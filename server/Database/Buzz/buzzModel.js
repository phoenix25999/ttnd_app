const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['Activity', 'Lost and Found']
    }
})

const buzzModel = mongoose.model('Buzz', buzzSchema);

module.exports = buzzModel;