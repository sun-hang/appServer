const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema({
    data: {
        type: Number,
        required: true
    },
    visits: {
        type: Number,
        default: 1
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