const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const deliverySchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true
    },
    scheduleId: [{
        type: ObjectId,
        ref: 'Schedule'
    }]
})

module.exports = mongoose.model('DeliverySchema', deliverySchema);