const express = require('express');
const router = express.Router();
const { calculateCost } = require('../controllers/calculateControllers');

// POST /calculate
router.post('/calculate', calculateCost);

module.exports = router;