const vaccinationCenterRouter = require('express').Router();
const {validateVaccinationCenter,validateUpdatedVaccinationCenter}=require('../models/vaccinationCenter')
const {validate}=require('../middlewares');
const {
    vaccinationCenterController : vCenterCtrl
} = require('../controllers');

vaccinationCenterRouter
    .route('')
    .get( vCenterCtrl.getAllVaccinationCenters)
    .post(validate(validateVaccinationCenter),vCenterCtrl.createVaccinationCenter)

vaccinationCenterRouter
    .route('/:id')
    .get( vCenterCtrl.getVaccinationCenter)
    .put( validate(validateUpdatedVaccinationCenter),vCenterCtrl.updateVaccinationCenter)
    .delete( vCenterCtrl.deleteVaccinationCenter)

module.exports = vaccinationCenterRouter