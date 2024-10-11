const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const express = require('express');
let Media = require("../../models/Media/gallery");

// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './client/public/uploads/media');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

//create
router.route("/gallery/add").post(upload.single('image'), (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.file.filename;

    console.log(req.file, req.body);

    const newMedia = new Media({
        name,
        description,
        image,
    });

    newMedia.save()
        .then(() => {
            res.json("Media added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.use('/gallery/uploads/media', express.static(path.join(__dirname, '../../client/public/uploads/media')));

router.route("/gallery/read").get((req, res) => {
    Media.find()
        .then((media) => {
            res.json(media);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/gallery/update/:id").put(async(req, res) => {
    const userId = req.params.id;
    const { name, description, image } = req.body;

    const updateMedia = {
        name,
        description,
    };

    if (image) {
        updateMedia.image = image;
    }

    try {
        await Media.findByIdAndUpdate(userId, updateMedia);
        res.status(200).send({ status: "Content Updated" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with updating", error: err.message });
    }
});

router.route("/gallery/delete/:id").delete(async(req, res) => {
    const userId = req.params.id;
    try {
        await Media.findByIdAndDelete(userId);
        res.status(200).send({ status: "Content deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete user", error: err.message });
    }
});

router.route("/gallery/get/:id").get(async(req, res) => {
    const userId = req.params.id;
    try {
        const media = await Media.findById(userId);
        res.status(200).send({ status: "User fetched", media });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    }
});

module.exports = router;
