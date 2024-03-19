// create student router
const studentRouter = require('express').Router();
// import models
const studentModel = require('../models/studentModel.js');

// to get all datas
studentRouter.get('/',(request,response) => {

    studentModel.find({},{}).then( (students) => {
        response.status(200).json(students);
    } ).catch( (error) => {
        error('Error getting datas ....',error);
        response.status(400).json({'message':'Error in fetching data.'});
    });

});

//  add a new student 
studentRouter.post('/addStudent', (request,response) => {

const newStudent = new studentModel(request.body);

newStudent.save().then( () => {
    response.status(201).json({message : "student created sucessfully."});
} );

});

// to get single students
studentRouter.get('/:id', (request,response) => {

    const id = request.params.id;
    
    studentModel.findById(id).then( (student) => {
        response.status(200).json(student);
        }).catch( (error) => {
        response.status(404).json({message:'The student with the given ID was not found.'});
    });

});

// delete student
studentRouter.delete('/deleteStudent/:id', (request,response) => {

    const id = request.params.id;

    studentModel.findByIdAndDelete(id).then( (student) => {
        if(student){
            response.status(204).json({message:"Deleted Successfully"});
        }else{
            response.status(404).json({message:"No student Found With Given Id"});
        }
    }).catch( (error) => {
        response.status(500).json({message:"delete failed"});
    });

});

//  update existing entire student
studentRouter.put('updateStudent/:id', (request,response) => {

    const id = request.params.id;

    const newStudent = request.body;

    studentModel.findByIdAndUpdate(id,newStudent).then( (student) => {
        if(student){
            response.status(200).json({message : "student updated sucessfully."});
        }else{
            response.status(404).json({message : "given student id not found !"});
        }
    }).catch( (error) => {
        response.status(404).json({message : "update student failed"});
    });

});

//  update existing student value
studentRouter.patch('updateStudent/:id', (request,response) => {

    const id = request.params.id;

    const newStudent = request.body;

    studentModel.findByIdAndUpdate(id,newStudent).then( (student) => {
        if(student){
            response.status(200).json({message : "student updated sucessfully."});
        }else{
            response.status(404).json({message : "given student id not found !"});
        }
    }).catch( (error) => {
        response.status(404).json({message : "update student failed"});
    });

});

// to change mentor to particular student 
studentRouter.patch('/:studentId/assignedMentor/:mentorId' , (request,response) => {

    // define id
    const studentId = request.params.studentId ;
    const mentorId= request.params.mentorId ;

    // find the student and  assign the mentor using find by id and update
    studentModel.findByIdAndUpdate({id : studentId},mentorId)
        .then( (mentor) => {

            if(mentor) {
              response.status(200).json({message : "Students added to mentor sucessfully."})
            } else {
              response.status(404).json({message : "Mentor not found!"})
            }

          })
          .catch( (error) => {
            response.status(404).json({message : "Error in adding students to mentor"})
          });

      });
    

module.exports = studentRouter;