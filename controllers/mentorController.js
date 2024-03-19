// create Mentor router
const mentorRouter = require('express').Router();
// import models
const mentorModel = require('../models/mentorModel.js');

// to get all datas
mentorRouter.get('/',(request,response) => {

    mentorModel.find({},{}).then( (mentors) => {
        response.status(200).json(mentors);
    } ).catch( (error) => {
        error('Error getting datas ....',error);
        response.status(400).json({'message':'Error in fetching data.'});
    });

});

//  add a new Mentor 
mentorRouter.post('/addMentor', (request,response) => {

const newMentor = new mentorModel(request.body);

newMentor.save().then( () => {
    response.status(201).json({message : "Mentor created sucessfully."});
} );

});

// to get single Mentors
mentorRouter.get('/:id', (request,response) => {

    const id = request.params.id;
    
    mentorModel.findById(id).then( (mentor) => {
        response.status(200).json(mentor);
        }).catch( (error) => {
        response.status(404).json({message:'The Mentor with the given ID was not found.'});
    });

});

// to get single Mentor students
mentorRouter.get('/assignedStudent/:mentorId', (request,response) => {

    const mentorId = request.params.mentorId;
    
    mentorModel.aggregate([
        { $match: { mentorId: mentorId } },
        { $lookup: {
            from: 'student',
            localField: 'studentsAssigned',
            foreignField: 'name',
            as: 'studentsAssigned'
          }
        }
      ])
      .then( (mentor) => {
        if(mentor.length > 0) {
          response.status(200).json(mentor[0].studentsAssigned);
        } else {
          response.status(404).json( { message: 'No student record found for this mentor.' });
        }
      })
      .catch( (error) => {
        response.status(200).json({message : "error while getting data"});
      });

});

// delete Mentor
mentorRouter.delete('/deleteMentor/:id', (request,response) => {

    const id = request.params.id;

    mentorModel.findByIdAndDelete(id).then( (mentor) => {
        if(mentor){
            response.status(204).json({message:"Deleted Successfully"});
        }else{
            response.status(404).json({message:"No Mentor Found With Given Id"});
        }
    }).catch( (error) => {
        response.status(500).json({message:"delete failed"});
    });

});

//  update existing entire Mentor
mentorRouter.put('updateMentor/:id', (request,response) => {

    const id = request.params.id;

    const newMentor = request.body;

    mentorModel.findByIdAndUpdate(id,newMentor).then( (mentor) => {
        if(mentor){
            response.status(200).json({message : "Mentor updated sucessfully."});
        }else{
            response.status(404).json({message : "given Mentor id not found !"});
        }
    }).catch( (error) => {
        response.status(404).json({message : "update Mentor failed"});
    });

});

//  update existing Mentor value
mentorRouter.patch('updateMentor/:id', (request,response) => {

    const id = request.params.id;

    const newMentor = request.body;

    mentorModel.findByIdAndUpdate(id,newMentor).then( (mentor) => {
        if(mentor){
            response.status(200).json({message : "Mentor updated sucessfully."});
        }else{
            response.status(404).json({message : "given Mentor id not found !"});
        }
    }).catch( (error) => {
        response.status(404).json({message : "update Mentor failed"});
    });

});

// update mentor's student assigned alone using student and mentor id 
mentorRouter.patch('/:mentorID/student',(request,response) => {

    // define id for mentor from params
    const mentorID = request.params.mentorID;

    //  get data from body of the request
    let studentData = request.body;

    // find the mentor and update students in studentassigned by findbyidandupdate
    mentorModel.findByIdAndUpdate({mentorId : mentorID},{
        $push : {
            studentsAssigned : { 
                $each : studentData
            }
        }
    }).then( (mentor) => {
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



// export mentor router
module.exports = mentorRouter;