const reservationRecordRouter = require('express').Router();
const { validateReservationRecord,validateUpdatedReservationRecord } = require('../models/reservationRecord')
const {validate } = require('../middlewares');
const {
    reservationRecordController: recordCtrl
} = require('../controllers');

reservationRecordRouter
    .route('')
    .get(recordCtrl.getAllReservationRecords)
    .post(validate(validateReservationRecord), recordCtrl.createReservationRecord)

reservationRecordRouter
    .route('/:id')
    .get(  recordCtrl.getReservationRecord)
    .put(validate(validateUpdatedReservationRecord),recordCtrl.updateReservationRecord)
    .delete(recordCtrl.deleteReservationRecord)

module.exports = reservationRecordRouter