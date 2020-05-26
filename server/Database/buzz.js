const mongoose = require('mongoose');

const buzzSchema = new mongoose.Schema({
    content: {type: String, required: true},
    category: {type: String, enum: ['Activity, Lost and Found'], default: 'Activity', required: true}
})

const buzzModel = mongoose.model('buzz', buzzSchema);

module.exports = buzzModel;