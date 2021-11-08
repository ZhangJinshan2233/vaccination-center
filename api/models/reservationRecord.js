'use strict'
const {
    Schema,
    model
} = require('mongoose');
const Joi=require('joi');

const ReservationRecordSchema = new Schema({
   idNumber: {
        type: String,
        required:[true,'Please enter  your NIRC number']
    },

    fullName:{
        type: String,
        required:[true,'Please enter  your full name']
    },

    _slot: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required:true
    },
    _centerId:{
        type: Schema.Types.ObjectId,
        ref:'VaccinationCenter',
        required:true
    }  
})

const ReservationRecord = model('ReservationRecord', ReservationRecordSchema)

const validateReservationRecord=(record)=>{
    const schema=Joi.object({
        idNumber:Joi.string().min(7).max(15).required(),
        _slot:Joi.string().min(23).max(30).required(),
        _centerId:Joi.string().min(23).max(30).required(),
        fullName:Joi.string().min(1).max(100).required()
    })
    return schema.validate(record)
}

const validateUpdatedReservationRecord=(record)=>{
    const schema=Joi.object({
        idNumber:Joi.string().min(7).max(15),
        _slot:Joi.string().min(23).max(30),
        fullName:Joi.string().min(1).max(100),
        _centerId:Joi.string().min(23).max(30)
    })
    return schema.validate(record)
}
module.exports = {
    ReservationRecord,
    validateReservationRecord,
    validateUpdatedReservationRecord
}