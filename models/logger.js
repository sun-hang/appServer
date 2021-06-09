const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema({
    time: {
        type: Number,
        required: true
    },
    visits: {
        type: Number,
        default: 0
    },
    orderNumber: {
        type: Number,
        default: 0
    },
    priceCount: {
        type: Number,
        default: 0
    }

})

module.exports = mongoose.model('Logger', loggerSchema);