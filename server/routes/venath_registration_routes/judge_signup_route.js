const express = require('express');
const router = express.Router();
//const bcrypt = require('bcrypt');
let JLogin = require("../../models/venath_registration_models/judge_signup_model");

const bcrypt = require('bcrypt');




router.post('/jsignup/save', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new instance of JLogin with the hashed password
    const newLogin = new JLogin({
      username: username,
      password: hashedPassword
    });

    // Save the new JLogin instance to the database
    await newLogin.save();

    // Respond with success message
    return res.status(200).json({
      success: 'Login information saved successfully',
    });
  } catch (err) {
    // If an error occurs, respond with error message
    return res.status(400).json({
      error: err.message,
    });
  }
});

router.post('/jsignup/checkUsername', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await JLogin.findOne({ username });

    if (existingUser) {
      res.json({ usernameExists: true });
    } else {
      res.json({ usernameExists: false });
    }
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post('/api/jsignin', async (req, res) => {

//   const {username, password}=req.body;
  
//   try{
//     const user= await JLogin.findOne({username});

//     if(user){
//       if(user.password===password){
//         return res.json({success: true});
//       }
//       else{
//         return res.json({success: false, message: 'invalid credentials'});
//       }
//     }
//     else{
//       return res.json({success: false, mesage: 'no user found'})
//     }
//   }
//   catch{
//     console.error("error in sign-in:", error);
//     return res.status(500).json({error: "Internal server error", details: error.mesage})
//   }
// });

router.delete('/jsignup/delete/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await JLogin.findOneAndDelete({ username });

    if (deletedUser) {
      res.json({ success: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/api/jsignin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await JLogin.findOne({ username });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return res.json({ success: true });
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



router.put('/jpassword/update/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const newPassword = req.body.newPassword;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password is required',
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await JLogin.findOneAndUpdate(
      { username: username },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});


module.exports = router;
