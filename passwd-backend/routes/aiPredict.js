const express = require('express');
const router = express.Router();
const { predictStrength } = require('../controllers/aiController');

router.post('/', predictStrength);

module.exports = router;
