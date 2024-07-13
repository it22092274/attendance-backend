const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    module: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        required: true,
    },
    time: {
        type:String,
        required: true,
    },
    dayOfWeek: {
        type: String,
        required: true,
    },
    lectureremail: {
        type: String,
        required: true,
    }
})

const ModuleModel = mongoose.model('Module', ModuleSchema)

module.exports = {ModuleModel}