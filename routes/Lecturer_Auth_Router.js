const express = require('express');
const router = express.Router();

const { lecturer_login, profile, resetPassword } = require('../controllers/Lecturer_Auth_Controller');

router.post('/login', cors(corsOptions), lecturer_login);
router.post('/profile', profile);
router.post('/reset-password', resetPassword);

module.exports = router;
