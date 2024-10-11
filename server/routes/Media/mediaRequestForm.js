const router = require("express").Router();
const requestForm = require("../../models/Media/mediaRequestForm");

router.post("/add", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const description = req.body.description;

    const rForm = new requestForm({
        fname,
        lname,
        email,
        address1,
        address2,
        city,
        state,
        zip,
        description
    });

    rForm.save()
        .then(() => res.json('Request sent!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Add route to fetch all request forms
router.route("/read").get((req, res) => {
    requestForm.find()
        .then((forms) => {
            res.json(forms);
        })
        .catch((err) => {
            console.error('Error fetching request forms:', err);
            res.status(500).json({ error: 'Error fetching request forms' });
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const formId = req.params.id;
    try {
        await requestForm.findByIdAndDelete(formId);
        res.status(200).send({ status: "Content deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete form", error: err.message });
    }
});

module.exports = router;
