const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin/admin_model");

router.post('/admin/save',(req,res)=>{
    let newAdmin=new Admin(req.body);
    newAdmin.save()
    .then(()=>{
        return res.status(200).json({
        sucess: "Admin saved successfully"
            });
  
        })
.catch((err)=>{
    return res.status(400).json({
        error: err
            });
        });
});

router.get('/admin', (req, res) => {
    Manager.find().exec()
        .then(admin => {
            return res.status(200).json({
                success: true,
                existingJudges: admin
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

router.post('/find_admin', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Admin.findOne({ username });
  
      if (user) {
        // Temporarily removing bcrypt for debugging
        // In production, bcrypt should be used for password hashing and comparison
        if (user.password === password) {
            return res.json({ success: true, admin: user }); //send nabager data

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