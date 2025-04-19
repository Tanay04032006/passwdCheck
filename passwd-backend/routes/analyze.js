const express = require('express');
const router = express.Router();
const { analyzePassword } = require('../controllers/analyzeController');

router.post('/', analyzePassword);

module.exports = router;
