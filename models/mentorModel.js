// import mongoose
const mongoose = require('mongoose');

// define schema
const mentorSchema = new mongoose.Schema({
    mentorId : String,
    mentorName : String,
    studentsAssigned : [String],
});

// mentor model
const mentorModel = mongoose.model('Mentors',mentorSchema ,'mentors');

// export
module.exports = mentorModel;