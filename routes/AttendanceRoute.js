const express = require('express')
const router = express.Router()

const {fetchAttendance, markAttendance}= require('../controllers/AttendenceController')

router.post('/attendance', markAttendance)
router.get('/attendance', fetchAttendance)

module.exports = router