const mongoose = require('mongoose')

const LecturerSchema  = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required:  true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
})

const LecturerModel = mongoose.model('Lecturer', LecturerSchema)

module.exports = {LecturerModel}