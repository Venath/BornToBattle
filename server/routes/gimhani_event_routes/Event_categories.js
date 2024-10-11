const express = require('express');
const router =  require('express').Router();
let EventCategories = require("../../models/gimhani_event_models/MainEventCategories_model");

//save main event 
router.post('/cat/save', (req, res)=>{
    let newPost = new EventCategories(req.body);
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

    //get data 
        router.get('/cat', (req, res) => {
            // Retrieve all events from the database
            EventCategories.find().exec()
              .then(categories => {
                // If successful, send a JSON response with success status and the array of events
                return res.status(200).json({
                  success: true,
                  existingCategories: categories
                });
              })
              .catch(err => {
                // If there is an error, send a JSON response with error status and the error message
                return res.status(400).json({
                  error: err
                });
              });
          });

          //getting category names
          router.get('/categories', async (req, res) => {
            try {
              const categories = await EventCategories.find({}, 'topic'); // Retrieve only categoryName field
              res.json(categories);
            } catch (error) {
              console.error('Error fetching categories:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            }
          });
          
          // Route to get a specific post by ID
router.get("/cat/:id",(req, res) => {
    
  let catId = req.params.id;
  console.log('Post ID:', catId);
  EventCategories.findById(req.params.id)
  .then(categories =>{
    console.log('Found Post:', categories);
    return res.status(200).json({
        success:true,
        categories
    });
  })
  .catch(err => {
    console.log('Error:', err);
    return res.status(400).json({success:false, err
    });
});
  
});


// update posts
router.put('/cat/update/:id', (req, res) => {
  EventCategories.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then(categories => {
          if (!categories) {
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

// Delete posts
router.delete('/cat/delete/:id', (req, res) => {
  EventCategories.findOneAndDelete({ _id: req.params.id })
      .then(deletedCategory => {
          if (!deletedCategory) {
              return res.status(404).json({
                  error: "Post not found"
              });
          }

          return res.json({
              message: "Delete Successful",
              deletedCategory
          });
      })
      .catch(err => {
          return res.status(400).json({
              message: "Delete unsuccessful",
              err
          });
      });
});

  // GET route to count judges with event "Dancing"
  router.get('/judges/count/dancing', async (req, res) => {
    try {
      // Retrieve categories where topic is 'dancing' and only return judgesCount field
      const categories = await EventCategories.find({ topic: 'Dancing' }, 'judgesCount');
  
      // Map categories to extract judgesCount for each category
      const judgesCounts = categories.map(category => category.judgesCount);
  
      // Send a successful response with judges counts for dancing categories
      res.json({ success: true, judgesCounts });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // GET route to count judges with event "Beatbox"
  router.get('/judges/count/beatbox', async (req, res) => {
    try {
      // Retrieve categories where topic is 'Beatbox' and only return judgesCount field
      const categories = await EventCategories.find({ topic: 'Beatbox' }, 'judgesCount');
  
      // Map categories to extract judgesCount for each category
      const judgesCounts = categories.map(category => category.judgesCount);
  
      // Send a successful response with judges counts for Beatbox categories
      res.json({ success: true, judgesCounts });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
          

          module.exports = router;