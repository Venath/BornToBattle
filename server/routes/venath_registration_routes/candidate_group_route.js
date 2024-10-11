const express = require('express');
const router = express.Router();
const Group = require("../../models/venath_registration_models/candidate_group_model"); // Import your Group model
const multer = require('multer');
const path = require('path');

// Route to create a new group
router.post('/group/save', (req, res) => {
    
      const groupData =new Group( req.body); // Get group data from request body
    //   const newGroup = await Group.create(groupData); // Create a new group document
    groupData.save().then(() => {
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
    const uploadPath = path.join(__dirname, '..', '..', 'client', 'public', 'uploads', 'group-photos');
    cb(null, uploadPath); // Set the destination folder for group photos
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Set the filename to be unique (timestamp + original extension)
  }
});

const upload = multer({ storage: storage });

// Route to update group photo
router.put('/group/update/:id/photo', upload.single('photo'), async (req, res) => {
  try {
    const groupId = req.params.id;
    const { filename } = req.file; // Uploaded photo filename

    // Update the group document with the photo filename
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { photo: filename }, // Assuming 'photo' is the field in your Group schema to store the photo filename
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ error: 'Group not found.' });
    }

    return res.status(200).json({ success: 'Group photo updated successfully', group: updatedGroup });
  } catch (error) {
    console.error('Error updating group photo:', error);
    return res.status(500).json({ error: 'Failed to update group photo.' });
  }
});
  
  // Route to get all groups
  router.get('/groups', async (req, res) => {
    try {
      const groups = await Group.find(); // Retrieve all groups from the database
      res.status(200).json(groups); // Respond with the retrieved groups
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to get a specific group by ID
  router.get('/groups/:id', async (req, res) => {
    try {
      const groupId = req.params.id;
      const group = await Group.findById(groupId); // Find group by ID
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(group); // Respond with the retrieved group
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to update a group by ID
  router.put('/updategroups/:id', async (req, res) => {
    try {
      const groupId = req.params.id;
      const updatedGroupData = req.body; // Get updated group data from request body
      const updatedGroup = await Group.findByIdAndUpdate(groupId, updatedGroupData, { new: true });
      if (!updatedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(updatedGroup); // Respond with the updated group
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Route to delete a group by ID
  router.delete('/groups/:id', async (req, res) => {
    try {
      const groupId = req.params.id;
      const deletedGroup = await Group.findByIdAndDelete(groupId); // Find and delete group by ID
      if (!deletedGroup) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/group/username/:username", (req, res) => {
    let username = req.params.username;

    Group.findOne({ username: username })
        .then(group => {
            if (!group) {
                return res.status(404).json({
                    success: false,
                    message: 'group not found'
                });
            }

            return res.status(200).json({
                success: true,
                group
            });
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                error: err
            });
        });
});
  
  module.exports = router;
