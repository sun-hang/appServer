const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    child: {
        type: [String],
        default: []
    }
})

module.exports = mongoose.model('Tag', TagSchema);

