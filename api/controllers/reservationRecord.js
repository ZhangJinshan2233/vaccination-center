'use strict';

const { reservationRecordService } = require('../service');
const safeAwait = require('safe-await');

const reservationRecordController = {
    getAllReservationRecords: async (req, res) => {
        const [err, reservationRecords] = await safeAwait(reservationRecordService.getAll()
        .populate('_slot', '_id name date').populate('_centerId','_id name'));
        if (err) throw err;
        res.status(200).json({
            reservationRecords
        })
    },
    createReservationRecord: async (req, res) => {

        let [err, record] = await safeAwait(
            reservationRecordService.register(req.body)
        )
        if (err) throw err
        res.status(200).json({
            record
        })
    },
    getReservationRecord: async (req, res) => {
        const [err, reservationRecord] = await safeAwait(reservationRecordService.getById(req.params.id)
        .populate('_slot', '_id name date')
        .populate('_centerId','_id name')
        );
        if (err) throw err;
        res.status(200).json({
            reservationRecord
        })
    },
    updateReservationRecord: async (req, res) => {
        const [err, message] = await safeAwait(reservationRecordService.updateRecord(req.params.id, req.body));
        if (err) throw err;
        res.status(200).json({
            message: "updated successfully"
        })

    },
    deleteReservationRecord: async (req, res) => {
        const [err, message] = await safeAwait(reservationRecordService.deleteRecord(req.params.id));
        if (err) throw err;
        res.status(200).json({
            message: "removed successfully"
        })
    }


}

module.exports = reservationRecordController