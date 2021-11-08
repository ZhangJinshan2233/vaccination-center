const BaseService = require('./base');
const Models = require('../models')
class SlotService extends BaseService {
  constructor(modelName, options) {
    super(modelName, options);
    this.model=Models[modelName]
  }

  async getSlotsByCenterId(_centerId){
    return this.model.find({
      _centerId
    })
  }
}

module.exports = new SlotService('Slot');