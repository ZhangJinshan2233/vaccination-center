'use strict'
const router = require('express').Router();

const vaccinationCenterRouter = require('./vaccinationCenter');
const slotRouter=require('./slot');
const reservationRecordRouter=require('./reservationRecord')
router.use('/api/v0/vaccinationCenters', vaccinationCenterRouter);
router.use('/api/v0/slots', slotRouter);
router.use('/api/v0/reservationRecords', reservationRecordRouter);


module.exports = router