const express = require('express');
const { getqr, fetchRealTimeData } = require('../controllers/qrController');
const router = express.Router();

router.post('/getqr/:id', getqr);
router.get('/attendance', fetchRealTimeData);

module.exports = router;
