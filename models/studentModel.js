// import mongoose for mongodb
const mongoose = require('mongoose');

// note schema 
const studentSchema = new mongoose.Schema({
    id : String,
    name : String,
    previous_mentor : {type : String,default : 'Not Assigned'},
    current_mentor : String
})

// create model using the schema 
const studentModel = mongoose.model('Students',studentSchema,'student');

module.exports = studentModel;