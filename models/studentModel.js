// import mongoose for mongodb
const mongoose = require('mongoose');

// note schema 
const studentSchema = new mongoose.Schema({
    id : String,
    name : String,
    mentor : String
})

// create model using the schema 
const studentModel = mongoose.model('Students',studentSchema,'student');

module.exports = studentModel;