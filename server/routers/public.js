const express = require('express');
const router = express.Router();
const { getReservations, createReservation } = require('../controllers/public');

router.use(express.json());

router.get('/reservations', getReservations);
router.post('/reservations', createReservation);

module.exports = router;