const {
    Schema,
    model
} = require('mongoose');
const Joi=require('joi');

const SlotSchema = new Schema({
    _centerId:{
        type:String,
        ref:'VaccinationCenter'
    },
    capacity:{
        type:Number,
        required:[true,'Please enter a number'],
    },
    registeredCount:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        required:[true,'Please enter a date']
    }
})
const Slot = model('Slot', SlotSchema)

class SlotClass {
   
    get isHaveSlots() {
        return this.capacity > this.registeredCount;
    }
}

SlotSchema .loadClass(SlotClass);

const validateSlot=(slot)=>{
    const schema=Joi.object({
        _centerId:Joi.string().min(24).max(30).required(),
        capacity:Joi.number().integer().positive().greater(20).less(100).required(),
        registeredCount:Joi.number().integer().positive(),
        date:Joi.date().greater('now').required()
    })
    return schema.validate(slot)
}

const validateUpdatedSlot=(slot)=>{
    const schema=Joi.object({
        _centerId:Joi.string().min(24).max(30),
        capacity:Joi.number().integer().positive().greater(20).less(100),
        registeredCount:Joi.number().integer().positive(),
        date:Joi.date().greater('now')
    })
    return schema.validate(slot)
}

module.exports = {
    Slot,
    validateSlot,
    validateUpdatedSlot
}