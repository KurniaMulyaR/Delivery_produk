const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { ObjectTanggal } = mongoose.Schema;

const schedule = new mongoose.Schema({
    sm: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }, 
    keterangan: {
        type: String,
        required: true
    },
    kendaraan: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    tujuan: {
        type: String,
        required:true
    },  
    deliveryId: {
        type: ObjectId,
        ref: 'Delivery'   
    }
})

module.exports = mongoose.model('Schedule', schedule);