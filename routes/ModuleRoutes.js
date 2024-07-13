const express = require('express')
const router = express.Router()
const {
    addModule,
    updateModule,
    readModule,
    deleteModule
} = require('../controllers/ModuleController');

router.post('/add', addModule);
router.put('/update/:id', updateModule);
router.get('/read/:email', readModule);
router.delete('/delete/:id', deleteModule);

module.exports = router;