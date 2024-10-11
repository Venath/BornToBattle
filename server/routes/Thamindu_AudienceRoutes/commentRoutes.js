// const express = require('express');
// const Comment = require('../../models/Thamindu_Audience/comments');

// const router = express.Router();


// //save comment    
// router.post('/add', async (req, res) => {
//     try {
//         const { comments } = req.body;  
//         const username = req.params.username; // Assuming you store the username in the session


//         // Create a new comment
//         const newComment = new Comment({ comments, username });   //
//         await newComment.save();
    
//         res.status(201).json({ message: 'Comment created successfully.' });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Internal server error.' });
//     }
// });
  

//   // Get all comments
// router.get('/', async (req, res) => {
//     try {
//       const username = req.params.username; // Assuming you store the username in the session

//       const comments = await Comment.find({username});      //.populate('username', 'username')
//       res.status(200).json(comments);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error.' });
//     }
// });


//   // Update a comment  
// router.put('/update/:commentId', async (req, res) => {
//     try {
//       const { comments } = req.body;
//       const { commentId } = req.params;
  
//       const updatedComment = await Comment.findByIdAndUpdate(
//         commentId,
//         { comments },
//         { new: true }
//       );
  
//       if (!updatedComment) {
//         return res.status(404).json({ message: 'Comment not found.' });
//       }
  
//       res.status(200).json({ message: 'Comment updated successfully.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error.' });
//     }
// });
  

//   // Delete a comment
// router.delete('/delete/:commentId', async (req, res) => {
//     try {
//       const { commentId } = req.params;
  
//       const deletedComment = await Comment.findByIdAndDelete(commentId);
  
//       if (!deletedComment) {
//         return res.status(404).json({ message: 'Comment not found.' });
//       }
  
//       res.status(200).json({ message: 'Comment deleted successfully.' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error.' });
//     }
// });
  

// module.exports = router;



const express = require('express');
const router = express.Router();
const fs = require('fs'); // for file system operations
const path = require('path');
const Comment = require('../../models/Thamindu_Audience/comments');
const Candidate = require('../../models/venath_registration_models/candidates');


//http://localhost:8020/comments



// Add a comment
router.post('/comments', async (req, res) => {
  try {
    const { comment, username, candidateId } = req.body;///////////////////
    const newComment = new Comment({ 
      comments: comment, 
      username, 
      candidate: candidateId///////////////////////////
    });

    await newComment.save();
    res.status(201).json(newComment);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Display comments
router.get('/comments', async (req, res) => {
  try {
    // const comments = await Comment.find();
    const comments = await Comment.find().populate('candidate', 'name');              // Populate the 'candidate' field with the 'name'

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Edit a comment
router.patch('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      id, 
      { comments: comment }, 
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Delete a comment
router.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(deletedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/candidates', async(req, res) => {
  try {
    const candidates = await Candidate.find({}, 'name'); // Fetch only the 'name' field
    res.json(candidates);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
})




module.exports = router;
