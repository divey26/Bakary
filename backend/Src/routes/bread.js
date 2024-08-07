const express = require('express');
const { createBread, getBreads } = require('../controllers/breadController');

const router = express.Router();

router.post('/api/bread', createBread);
router.get('/api/breads', getBreads);

module.exports = router;
