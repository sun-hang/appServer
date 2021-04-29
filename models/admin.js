const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    opedId: {
        type: String,
        requred: true,
        
    }
})

module.exports = mongoose.model("Admin", adminSchema);