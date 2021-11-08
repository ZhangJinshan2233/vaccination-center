'use strict';

const { vaccinationCenterService} = require('../service');
const safeAwait = require('safe-await');

const vaccinationCenterController = {
    getAllVaccinationCenters: async (req, res) => {
        const [err, vaccinationCenters] = await safeAwait(vaccinationCenterService.getAll());
        if (err) throw err;
        res.status(200).json({
            vaccinationCenters
        })
    },

   
    createVaccinationCenter: async (req, res) => {
        
        let [err, center] = await safeAwait(
            vaccinationCenterService.insert(req.body)
        )
        if (err) throw err
        res.status(200).json({
            center
        })
    },

    getVaccinationCenter: async (req, res) => {
        const [err, vaccinationCenter] = await safeAwait(vaccinationCenterService.getById(req.params.id));
        console.log(vaccinationCenter)
        if (err) throw err;
        res.status(200).json({
            vaccinationCenter
        })
    },

    updateVaccinationCenter: async (req, res) => {
        const [err, message] = await safeAwait(vaccinationCenterService.updateById(req.params.id, req.body));
        if (err) throw err;
        res.status(200).json({
            message: "updated successfully"
        })
    },

    deleteVaccinationCenter: async (req, res) => {
        const [err, message] = await safeAwait(vaccinationCenterService.deleteById(req.params.id));
        if (err) throw err;
        res.status(200).json({
            message: "removed successfully"
        })
    }

}

module.exports = vaccinationCenterController