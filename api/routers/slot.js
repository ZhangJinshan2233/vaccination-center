const slotRouter = require('express').Router();
const { validateSlot, validateUpdatedSlot } = require('../models/slot')
const { validate } = require('../middlewares');
const {
    slotController
} = require('../controllers');

slotRouter
    .route('')
    .get(slotController.getAllSlots)
    .post(validate(validateSlot), slotController.createSlot)

slotRouter
    .route('/center/:_centerId')
    .get(slotController.getSlotsByCenterId)
    
slotRouter
    .route('/:id')
    .get(slotController.getSlot)
    .put(validate(validateUpdatedSlot), slotController.updateSlot)
    .delete(slotController.deleteSlot)

module.exports = slotRouter