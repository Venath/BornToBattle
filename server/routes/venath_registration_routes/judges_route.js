const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Judge = require("../../models/venath_registration_models/judges_model");
const { signup, getbill } = require('../../client/src/components/venath_reg/regManager/sendEmail')

// POST route for adding a new Judge
router.post('/judges/save', (req, res) => {
    let newJudge = new Judge(req.body);
    newJudge.save()
        .then(() => {
            return res.status(200).json({
                success: "Judge saved successfully",
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
      const uploadPath = path.join(__dirname, '..', '..', 'client', 'public', 'uploads', 'judges');
  
      cb(null, uploadPath); // Set the destination folder for profile photos
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Set the filename to be unique (timestamp + original extension)
    }
  });

  const upload = multer({ storage: storage });

  router.put('/judge/update/:id/photo', upload.single('photo'), async (req, res) => {
    try {
      const judgeId = req.params.id;
      console.log('Judge ID:', judgeId);
      
      const { filename } = req.file; // Uploaded photo filename
      console.log('Uploaded Photo Filename:', filename);
  
      // Update the candidate document with the photo filename
      const updatedJudge = await Judge.findByIdAndUpdate(
        judgeId,
        { photo: filename }, // Assuming 'photo' is the field in your Judge schema to store the photo filename
        { new: true }
      );
  
      if (!updatedJudge) {
        console.error('Judge not found.');
        return res.status(404).json({ error: 'Judge not found.' });
      }
  
      console.log('Profile photo updated successfully:', updatedJudge);
      return res.status(200).json({ success: 'Profile photo updated successfully', judge: updatedJudge });
    } catch (error) {
      console.error('Error updating profile photo:', error);
      return res.status(500).json({ error: 'Failed to update profile photo.' });
    }
  });


// GET route for fetching all Judges
router.get('/judges', (req, res) => {
    Judge.find().exec()
        .then(judges => {
            return res.status(200).json({
                success: true,
                existingJudges: judges
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

//delete a judge
router.delete('/judge/delete/:id',(req,res)=>{
    Judge.findByIdAndDelete(req.params.id)
    .then(deletedJudge =>{
        return res.status(200).json({
            success:'deleted',
            deletedJudge
        });
    })

    .catch(err=>{
        return res.status(400).json({
            error:err
        });
    })
});

//select a judge
router.get('/judge/:id',(req,res)=>{
    Judge.findById(req.params.id)
    .then(Judge =>{
        return res.status(200).json({
            success:true,
            Judge
        });
    })

    .catch(err=>{
        return res.status(400).json({
            success:false,
            error:err
        });
    })
});

router.put('/judge/update/:id', async (req, res) => {
    try {
      const judgeId = req.params.id;
      const { name, age, gender, event, phoneNumber, institute, description, un, password } = req.body;
  
      const updateJudge = {
            name,
            age,
            gender,
            event,
            phoneNumber,
            institute,
            description,
            un,
            password
      };
  
      const updatedJudge = await Judge.findByIdAndUpdate(judgeId, updateJudge);
  
      if (!updatedJudge) {
        return res.status(404).json({ error: "Judge not found" });
      }
  
      return res.status(200).json({ status: "Judge updated", candidate: updateJudge });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: "Error", error: err.message });
    }
  });

  router.get("/judge/username/:username", (req, res) => {
    let username = req.params.username;

    Judge.findOne({ un: username })
        .then(judge => {
            if (!judge) {
                return res.status(404).json({
                    success: false,
                    message: 'judge not found'
                });
            }
            // const userId = user._id;

            return res.status(200).json({
                success: true,
                judge
            });
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                error: err
            });
        });
});

  // GET route to count judges with event "Dancing"
router.get('/vjudges/count/dancing', (req, res) => {
    Judge.countDocuments({ event: 'dancing' })
        .then(count => {
            return res.status(200).json({
                success: true,
                jcount: count
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

  //GET route to count judges with event "Beatbox"
  router.get('/vjudges/count/beatbox', (req, res) => {
    Judge.countDocuments({ event: 'beatbox' })
        .then(count => {
            return res.status(200).json({
                success: true,
                bcount:count
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

router.post('/user/signup', signup);
router.post('/product/getbill', getbill);


module.exports = router;
