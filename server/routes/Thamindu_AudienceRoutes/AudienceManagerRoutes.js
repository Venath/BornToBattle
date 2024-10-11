const express = require("express");
const router = express.Router();
const Audience = require("../../models/Thamindu_Audience/audience");
const Audi_signup = require("../../models/Thamindu_Audience/A_signup");




// Delete audience details
router.delete("/manager/audi/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const audience = await Audience.findByIdAndDelete(id);
        return res.status(200).json({success: true, audience});

        
        res.json(audience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.delete("/manager/audi/:username", async (req, res) => {
    try {
        const {username} = req.params;
        const audience = await Audi_signup.findOne(username);//////////////
        return res.status(200).json({success: true, audience});

        
        res.json(audience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Display all audience details
router.get("/manager/audi", async (req, res) => {
    try {
        const allAudience = await Audience.find();
        return res.status(200).json({ success: true, audience: allAudience });
        // res.json(allAudience);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});






module.exports = router;