const {
    Schema,
    model
} = require('mongoose');

const Joi=require('joi');

const VaccinationCenterSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please enter a name'],
        unique:true
    },
   
    personInCharge: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        required: true
    }
})
const VaccinationCenter = model('VaccinationCenter', VaccinationCenterSchema)

const validateVaccinationCenter=(center)=>{
    const schema=Joi.object({
        name:Joi.string().min(5).max(500).required(),
        personInCharge:Joi.string(),
        address:Joi.string().min(5).max(500).required()
    })
    return schema.validate(center)
}

const validateUpdatedVaccinationCenter=(center)=>{
    const schema=Joi.object({
        name:Joi.string().min(5).max(500),
        personInCharge:Joi.string(),
        address:Joi.string().min(5).max(500)
    })
    return schema.validate(center)
}
module.exports = {
    VaccinationCenter,
    validateVaccinationCenter,
    validateUpdatedVaccinationCenter
}