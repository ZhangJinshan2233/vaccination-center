const BaseService = require('./base');
class VaccinationCenterService extends BaseService {
  constructor(modelName, options) {
    super(modelName, options);
  }
}

module.exports = new VaccinationCenterService('VaccinationCenter');