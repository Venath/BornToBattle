const express = require("express");
const router = require("express").Router();
const multer = require('multer');
let Candidate = require("../../models/venath_registration_models/candidates");
//const Photo = require('../models/candidates');
const path = require('path');


 

router.post('/candidates/save', (req, res)=>{
    let newPost = new Candidate(req.body);
    newPost.save()
    .then(() => {
        return res.status(200).json({
            success: "Posts saved successfully",
            // data: {
            //     _id: createdUser._id,
            // }
        });
    })
    .catch((err) => {
        return res.status(400).json({
            error: err
        });
    });

        });


// Multer configuration for storing photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', '..', 'client', 'public', 'uploads', 'profile-photos');

    cb(null, uploadPath); // Set the destination folder for profile photos
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set the filename to be unique (timestamp + original extension)
  }
});

const upload = multer({ storage: storage });

// Route to update candidate photo
router.put('/candidate/update/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const candidateId = req.params.id;
    const { filename } = req.file; // Uploaded photo filename

    // Update the candidate document with the photo filename
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { photo: filename }, // Assuming 'photo' is the field in your Candidate schema to store the photo filename
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ error: 'Candidate not found.' });
    }

    return res.status(200).json({ success: 'Profile photo updated successfully', candidate: updatedCandidate });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return res.status(500).json({ error: 'Failed to update profile photo.' });
  }
});


//read get candidates

router.get('/candidates', (req, res) => {
    Candidate.find().exec()
        .then(Candidate => {
            return res.status(200).json({
                success: true,
                existingCandidates: Candidate
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});



// router.route("/").get((req,res)=>{
//     const name=req.body.name;
//     const age=Number(req.body.age);
//     const gender=req.body.gender;

//     Student.find()
//     .then((students)=>{
//         res.json(students)
//     })
//     .catch((err)=>{
//        console.log(err);
//     })

// })


//update students

router.put('/candidate/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, age, gender } = req.body;

    const updateCandidate = {
      name,
      age,
      gender
    };

    const updatedCandidate = await Candidate.findByIdAndUpdate(userId, updateCandidate);

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({ status: "Candidate updated", candidate: updatedCandidate });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "Error", error: err.message });
  }
});



// router.route("/candidate/update/:id").put(async (req,res)=>{
//     let userId = req.params.id;

// const{name,age,gender}=req.body; //dstrutcure
//     // const name=req.body.name;
//     // const age=Number(req.body.age);
//     // const gender=req.body.gender;

//     const updateStudent = {
//         name,
//         age,
//         gender
//     }
//     const update = await Student.findByIdAndUpdate(userId,updateStudent)
//     //res.status(200).send({status: "User updated", user:update})
    

//     .then(()=>{
//         res.status(200).send({status: "User updated", user:update})
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).send({status: "Error",err})
//     })


// })



//delete students
router.delete('/candidate/delete/:id', (req, res) => {
    console.log('Deleting student with ID:', req.params.id);

    Candidate.findByIdAndDelete(req.params.id)
        .then(deletedCandidate => {
            console.log('Deleted candidate:', deletedCandidate);
            return res.status(200).json({
                success: 'deleted',
                deletedCandidate
            });
        })
        .catch(err => {
            console.error('Delete error:', err);
            return res.status(400).json({
                error: err
            });
        });
});



// router.route("/delete/:id").delete(async (req,res)=>{
//     let userId = req.params.id;


//  await Student.findByIdAndDelete(userId)
//     //res.status(200).send({status: "User updated", user:update})
    

//     .then(()=>{
//         res.status(200).send({status: "User Deleted", user:update})
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).send({status: "Error delete",err})
//     })


// })

// //get only one person
// router.route("/get/:id").get(async (req,res)=>{
//     let userId = req.params.id;
//   const user=  await Student.findById(userId)
//     .then(()=>{
//         res.status(200).send({status: "User fetched", user:user})
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).send({status: "Error delete",err})
//     })
// })



//get a specific student

// router.get("/student/:id",(req,res)=>{
//     let studentId= req.params.id;

//     Student.findById(studentId,(err,student)=>{
//         if(err){
//             return res.status(400).json({success:false, err})
//         }

//         return res.status(200).json({
//             success:true,
//             student
//         });
//     });
// })

router.get("/candidate/:id",(req,res) => {
    let candidateId= req.params.id;

    Candidate.findById(req.params.id)
        .then(Candidate => {
           
            return res.status(200).json({
                success:true,
                Candidate
            });
        })
        .catch(err => {
            
            return res.status(400).json({
                success:false,
                 err
            });
        });
});


// Your route for fetching candidates by username
router.get("/candidate/username/:username", (req, res) => {
    let username = req.params.username;

    Candidate.findOne({ un: username })
        .then(candidate => {
            if (!candidate) {
                return res.status(404).json({
                    success: false,
                    message: 'Candidate not found'
                });
            }

            return res.status(200).json({
                success: true,
                candidate
            });
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                error: err
            });
        });
});





router.get('/user/find/:username', async (req, res) => {
    try {
      const username = req.params.username;
  
      // Find the user by username
      const user = await User.findOne({ un: username });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Assuming your User model has an '_id' property for the user ID
      const userId = user._id;
  
      return res.status(200).json({
        success: true,
        user,
        userId,
      });
    } catch (error) {
      console.error('Error finding user:', error);
      return res.status(500).json({
        success: false,
        error,
      });
    }
  });


router.get('/candidates/:event', (req, res) => {
    const event = req.params.event;
  
    Candidate.find({ event })
      .exec()
      .then((candidates) => {
        return res.status(200).json({
          success: true,
          existingCandidates: candidates,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  });



module.exports = router;