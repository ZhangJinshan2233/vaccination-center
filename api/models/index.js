'use strict'
const mongoose = require('mongoose');
const config = require('../config');
const connection = mongoose.connection;
const {
    once
} = require('events')

const {VaccinationCenter}=require('./vaccinationCenter');
const {Slot}=require('./slot');
const {ReservationRecord}=require('./reservationRecord');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set("useUnifiedTopology", true);
async function initialize() {
    mongoose.connect(config.dbUrl, {
        socketTimeoutMS: 3000000,
        keepAlive: true,
        useNewUrlParser: true,
        // autoIndex: false
    })
    await once(connection, 'open')
}

initialize()
    .then(() => {
        console.log('MongoDB database connection established successfully!');
    })
    .catch((err) => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        process.exit();
    })


module.exports = {
   VaccinationCenter,
   Slot,
   ReservationRecord
}