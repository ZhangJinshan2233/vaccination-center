const BaseService = require('./base');
const mongoose = require('mongoose')
const Models = require('../models')
class ReservationRecordService extends BaseService {
  constructor(modelName, options) {
    super(modelName, options);
    this.model = Models[modelName]
  }

  async register(record) {
    const { idNumber, _slot} = record;
    const reservationRecord = await this.model.findOne({
      idNumber
    });
    if (reservationRecord) {
      return reservationRecord
    }
    const session = await mongoose.startSession();

    try {
      //start session
      await session.startTransaction();
      // check inventory
      const slot = await Models.Slot.findById({
        _id: _slot,
      }).session(session)

      if (slot.registeredCount >= slot.capacity) {
        throw new Error('no slot')
      }
      //insert new record
      let newRecord = await this.model.create([{
        ...record
      }], { session })

      if (!newRecord) throw new Error('created unsuccessfully')
      //update registered count 
      let updatedSlotMessage = await Models.Slot
        .findByIdAndUpdate(
          _slot, {
          $inc: {
            registeredCount: 1
          }
        }).session(session)
      if (!updatedSlotMessage) throw new Error('created unsuccessfully');

      await session.commitTransaction();
      return newRecord
    } catch (err) {
      await session.abortTransaction();
      return err
    } finally {
      session.endSession();
    }
  }
  //update record
  async updateSlotOfRecord(_id, properties) {
    const { _slot } = properties

    const session = await mongoose.startSession();
    //start session
    await session.startTransaction();
    try {
      //get the details of record
      const record = await this.model.findById({ _id })
        .session(session);
      if (!record) throw new Error('update unsuccessfully');
      // check inventory of new slot``
      const newSlot = await Models.Slot.findById({
        _id: _slot,
      }).session(session)
      if (!newSlot) throw new Error('update unsuccessfully')
      if (newSlot.registeredCount >= newSlot.capacity) {
        throw new Error('no slot')
      }
      //get old Slot
      const oldSlot = await Models.Slot.findById({
        _id: record['_slot']
      }).session(session)
      if (!oldSlot) throw new Error('update unsuccessfully');
      if (oldSlot._id == _slot) throw new Error('Please choose another slot')
      //update new slot,old slot, record
      let updatedOldSlotMessage = await Models.Slot
        .findByIdAndUpdate(
          record._slot, {
          $inc: {
            registeredCount: -1
          }
        }).session(session);
      if (!updatedOldSlotMessage) throw new Error('update unsuccessfully');

      let updatedNewSlotMessage = await Models.Slot
        .findByIdAndUpdate(
          _slot, {
          $inc: {
            registeredCount: 1
          }
        }).session(session);
      if (!updatedNewSlotMessage) throw new Error('update unsuccessfully');

      let updatedRecord = await this.model
        .findByIdAndUpdate(
          _id, {
          $set: {
            ...properties
          }
        }).session(session);
      if (!updatedRecord) throw new Error('update unsuccessfully')
      await session.commitTransaction();
      return "updated successfully";
    } catch (err) {
      await session.abortTransaction();
      return err;
    } finally {
      session.endSession();
    }
  }

  async updateRecord(_id, properties) {
    if ("_slot" in properties) {
      return this.updateSlotOfRecord(_id, properties)
    } else {
      return this.updateById(_id, properties)
    }
  }

  async deleteRecord(_id) {
    const session = await mongoose.startSession();
    //start session
    await session.startTransaction();
    try {
      //get the details of record
      const record = await this.model.findById({ _id })
        .session(session);
      if (!record) throw new Error('deleted unsuccessfully');

      let updatedSlotMessage = await Models.Slot
        .findByIdAndUpdate(
          record._slot, {
          $inc: {
            registeredCount: -1
          }
        }).session(session);
      if (!updatedSlotMessage) throw new Error('deleted unsuccessfully');

      const updatedRecord = await this.model
        .findByIdAndDelete({ _id })
        .session(session);
      if (!updatedRecord) throw new Error('deleted unsuccessfully')
      await session.commitTransaction();
      return "updated successfully";
    } catch (err) {
      await session.abortTransaction();
      return err;
    } finally {
      session.endSession();
    }
  }
}

module.exports = new ReservationRecordService('ReservationRecord');