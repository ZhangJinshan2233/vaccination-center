const Models = require('../models');

/**
 * base service class
 * provide basic functions
 */
class BaseService {
  constructor(modelName, options) {
    this.modelName = modelName;
    this.options = options || {}
  }
  /**
   * get all documents 
   *
   */
 getAll(){
    return Models[this.modelName]
      .find()

  };

  /**
   * create new document
   * @param {*} properties 
   */
  insert(document) {
    return Models[this.modelName]
      .create({
        ...document
      })
  }

  /**
   * get document by id 
   * @param {*} _id 
   */
  getById(_id){
    return Models[this.modelName]
      .findById(_id)
  };

  /**
   * delete document by id 
   * @param {*} _id 
   */
  deleteById(_id)  {
    return Models[this.modelName]
      .findByIdAndDelete(_id)
  };

  /**
   * update document by id 
   * @param {*} _id 
   * @param {*} model 
   */
  updateById(_id, properties){
    return Models[this.modelName]
      .findByIdAndUpdate(
        _id, {
        $set: {
          ...properties
        }
      })
  }

}

module.exports = BaseService