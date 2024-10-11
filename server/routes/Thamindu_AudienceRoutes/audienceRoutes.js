const express = require("express");
const router = express.Router();
const Audience = require("../../models/Thamindu_Audience/audience");




//working => username save 
router.post("/audience/save/un", async (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
          return res.status(400).json({ error: 'Missing username field' });
        }
        const audienceData = { 
            username: username 
        };

        const audience = new Audience(audienceData);
        await audience.save();


        res.status(201).json({ success: 'Request sent successfully', audience });

    } catch (error) {
        console.error('Error sending request:', error);
        res.status(500).json({ error: 'Failed to send request' });
    }
});




// Edit audience details
router.put("/audience/update/:id", async (req, res) => {
    try {

        const {id} = req.params;
        const { name, age, gender, phoneNumber } = req.body;

        const updatedAudience = await Audience.findByIdAndUpdate(
            id, 
            { name, age, gender, phoneNumber },
            {new: true}
        );
        res.json(updatedAudience);
        
        
    } catch (error) {
        res.status(400).json({ error: err.message });
        console.error("Error updating audience: ", error);
        // res.status(500).json({ error: "Failed to update audience" });
    }
});



// Delete audience details
router.delete("/audience/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const audience = await Audience.findByIdAndDelete(id);
        if (!audience) {
            res.status(404).json("Audience not found");
        }
        res.status(200).json(audience);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



// Display audience details => postman work
router.get("/audience/:username", async (req, res) => {
    
    const {username} = req.params;
    
    try {
        const audience = await Audience.findOne({ username });
        if (!audience) {
            return res.status(404).json({ error: 'Audience not found' });
        }
        res.status(200).json({ success: true, audience });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



module.exports = router;