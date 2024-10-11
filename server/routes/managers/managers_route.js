const express = require("express");
const router = express.Router();
const Manager = require("../../models/managers/managers_model");

router.post('/manager/save',(req,res)=>{
    let newManager=new Manager(req.body);
    newManager.save()
    .then(()=>{
        return res.status(200).json({
        sucess: "Manager saved successfully"
            });
  
        })
.catch((err)=>{
    return res.status(400).json({
        error: err
            });
        });
});

router.get('/managers', (req, res) => {
    Manager.find().exec()
        .then(managers => {
            return res.status(200).json({
                success: true,
                existingJudges: managers
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

router.post('/find_manager', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Manager.findOne({ username });
  
      if (user) {
        // Temporarily removing bcrypt for debugging
        // In production, bcrypt should be used for password hashing and comparison
        if (user.password === password) {
            return res.json({ success: true, manager: user }); //send nabager data

        } else {
          return res.json({ success: false, message: 'Invalid credentials' });
        }
      } else {
        return res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error("Error in sign-in:", error);
      return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });

module.exports = router;