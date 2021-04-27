const mongoose = require('mongoose');

module.exports.option = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    child: {
        type: [String],
        default: []
    }
})

module.exports.optionDetail = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})