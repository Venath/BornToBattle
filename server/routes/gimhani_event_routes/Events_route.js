//routes file - used to handle requests

//write https requests in this file 

const express = require('express');
const router =  require('express').Router();
let Events = require("../../models/gimhani_event_models/Events_model");

//save posts

router.post('/event/save', (req, res)=>{
    let newPost = new Events(req.body);
    newPost.save()
    .then(() => {
        return res.status(200).json({
            success: "Posts saved successfully"
        });
    })
    .catch((err) => {
        return res.status(400).json({
            error: err
        });
    });

        });

// //get posts
// router.get('/posts',(req, res) =>{
//     Posts.find().exec((err,posts) =>{ //find() to find post methods
//         if(err){
//             return res.status(400),json({
//                 error:err
//             });
//         }
//         return res.status(200).json({
//             success:true,
//             existingPosts:posts
//         });
        
//     });
// });
router.get('/events', (req, res) => {
    // Retrieve all events from the database
    Events.find().exec()
      .then(events => {
        // If successful, send a JSON response with success status and the array of events
        return res.status(200).json({
          success: true,
          existingEvents: events
        });
      })
      .catch(err => {
        // If there is an error, send a JSON response with error status and the error message
        return res.status(400).json({
          error: err
        });
      });
  });
  

// //get specific posts

// router.get("/post/:id",(req,res) =>{
//     let postId =req.params.id;

//     Posts.findById(postId,(err,post) =>{
//         if(err){
//             return res.status(400).json({success:false,err})
//         }

//         return res.status(200).json({
//             success:true,
//             post 
//         });

//     });
// });


// Route to get a specific post by ID
router.get("/event/:id",(req, res) => {
    
      let eventId = req.params.id;
      console.log('Post ID:', eventId);
      Events.findById(req.params.id)
      .then(event =>{
        console.log('Found Post:', event);
        return res.status(200).json({
            success:true,
            event
        });
      })
      .catch(err => {
        console.log('Error:', err);
        return res.status(400).json({success:false, err
        });
    });
      
});

// //update posts

// router.put('/post/update/:id', (req, res) => {

//     Posts.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set:req.body
//         },
//         (err,post)=>{
//             if(err){req
//                 return res.status(400).json({error:err});
//             }

//             return res.status(200).json({
//                 success:"Updated successfully"
//             });

//         }
//     );
// })


// update posts
router.put('/event/update/:id', (req, res) => {
    Events.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(event => {
            if (!event) {
                return res.status(404).json({
                    error: "Post not found"
                });
            }

            return res.status(200).json({
                success: "Updated successfully"
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err.message
            });
        });
});


// //delete posts

// router.delete('/post/delete/:id',(req,res) =>{
//     Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
//         if(err) return res.status(400).json({
//             message:"Delete unsuccessful",err
//         });

//         return res.json({
//             message:"Delete Successful",deletedPost
//         });
//     });
// });



// Delete posts
router.delete('/event/delete/:id', (req, res) => {
    Events.findOneAndDelete({ _id: req.params.id })
        .then(deletedEvent => {
            if (!deletedEvent) {
                return res.status(404).json({
                    error: "Post not found"
                });
            }

            return res.json({
                message: "Delete Successful",
                deletedEvent
            });
        })
        .catch(err => {
            return res.status(400).json({
                message: "Delete unsuccessful",
                err
            });
        });
});

// router.get('/total-events', async (req, res) => {
//     try {
//       const totalEvents = await Event.countDocuments();
//       res.json({ totalEvents });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


 module.exports = router;