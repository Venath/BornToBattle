const router = require("express").Router();
const multer = require('multer');
let Item = require("../../models/Staller/itemModels");
const path = require('path');
const express = require('express');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads/stallItems')
    },
    filename: function (req, file, cb) { 
      return cb(null, `${Date.now()}_${file.originalname}`) 
    }
  })
  const upload = multer({ storage })



// Create
router.route("/staller/items/create").post(upload.single('pImage'), (req, res) => {

    const pName = req.body.pName;
    const pPrice = Number(req.body.pPrice);


    console.log(req.file, req.body); //debugging
    const pImage = req.file.filename;

    const newItem = new Item({
        pName,
        pPrice,
        pImage,
    });

    newItem.save().then(() => {
        res.json("Item created.");
    }).catch((err) => {
        console.log(err);
    });
});


//Read

// Serving images from the 'uploads' directory/folder
router.use('/staller/items/uploads/stallItems', express.static(path.join(__dirname, '../../uploads/stallItems')));

// Read route
router.route("/staller/items/read").post((req, res) => {
  Item.find().then((items) => {
    res.json(items);
  }).catch((err) => {
    console.log(err);
  });
});

//Update

//get ID route

router.route("/staller/items/get/:Itemid").get(async (req, res) => {
  let itemId = req.params.Itemid;

  const getID = await Item.findById(itemId)
  .then( (item) => {
    res.json({
      pName: item.pName,
      pPrice: item.pPrice,
      pImage: item.pImage, // Assuming this is the filename stored in your database
    });
  }).catch((err) => {
      console.log(err)
  })

})

// Update route
router.route("/staller/items/update/:Itemid").put(upload.single('pImage'), async (req, res) => {
  const itemId = req.params.Itemid;
  const { pName, pPrice } = req.body;

  // Check if there's a new image uploaded
  let pImage;
  if (req.file) {
    pImage = req.file.filename;
  }

  const updateItem = {
    pName,
    pPrice,
    ...(pImage && { pImage }), // Only include pImage in updateItem if it's provided
  };

  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateItem, { new: true });
    res.status(200).json({ status: "Item Updated", updatedItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error in updating Item data", error: err.message });
  }
});


// Delete route
router.route("/staller/items/delete/:Itemid").delete(async (req, res) => {
  const itemid = req.params.Itemid;

  try {
    await Item.findByIdAndDelete(itemid);
    res.status(200).json({ status: "Item deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: "Error in deleting the Item" });
  }
});

module.exports = router;
