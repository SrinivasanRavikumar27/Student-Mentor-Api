// import express js
const express = require('express');

// import cors - to handle cross-origin resource sharing (CORS)
const cors = require('cors');

// import studentRouter,mentorRouter
const studentRouter = require('./controllers/studentController.js');
const mentorRouter = require('./controllers/mentorController.js');

// create instant express app
const app = express();

// create middleware to convert object to json 
app.use(express.json());

// create cors middleware to allow cross-origin requests
app.use(cors());

// define endpoints
app.use('/students',studentRouter);
app.use('/mentors',mentorRouter);

// export app
module.exports = app;

