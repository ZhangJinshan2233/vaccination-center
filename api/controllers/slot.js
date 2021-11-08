'use strict';

const { slotService} = require('../service');
const safeAwait = require('safe-await');

const slotController = {
    getAllSlots: async (req, res) => {
        const [err, slots] = await safeAwait(slotService.getAll());
        if (err) throw err;
        res.status(200).json({
            slots
        })
    },

    createSlot: async (req, res) => {
        
        let [err, center] = await safeAwait(
            slotService.insert(req.body)
        )
        if (err) throw err
        res.status(200).json({
            center
        })
    },

    getSlot: async (req, res) => {
        const [err, slot] = await safeAwait(slotService.getById(req.params.id));
        console.log(slot)
        if (err) throw err;
        res.status(200).json({
            slot
        })
    },

    updateSlot: async (req, res) => {
        const [err, message] = await safeAwait(slotService.updateById(req.params.id, req.body));
        if (err) throw err;
        res.status(200).json({
            message: "updated successfully"
        })
    },

    deleteSlot: async (req, res) => {
        const [err, message] = await safeAwait(slotService.deleteById(req.params.id));
        if (err) throw err;
        res.status(200).json({
            message: "removed successfully"
        })
    },

    getSlotsByCenterId:async(req,res)=>{
        const [err, slots] = await safeAwait(slotService.getSlotsByCenterId(req.params._centerId));
        if (err) throw err;
        res.status(200).json({
            slots
        })
    }
}

module.exports = slotController