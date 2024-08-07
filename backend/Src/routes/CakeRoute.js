const express = require('express');
const router = express.Router();
const { createCake, getAllCakes } = require('./../controllers/CakeController');

router.post('/cake', createCake);
router.get('/cakes', getAllCakes);

module.exports = router;
