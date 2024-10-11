// routes/candidates.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let Login = require("../../models/Staller/stallHolder_signUp_signIn");


router.post('/signup/save', (req, res) => {
  let newLogin = new Login(req.body);

  newLogin.save()
    .then(() => {
      return res.status(200).json({
        success: 'Login information saved successfully',
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err.message,
      });
    });
});

router.post('/signup/checkUsername', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await Login.findOne({ username });

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

router.delete('/signup/delete/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await Login.findOneAndDelete({ username });

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




router.post('/api/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ username });

    if (user) {
      // Temporarily removing bcrypt for debugging
      // In production, bcrypt should be used for password hashing and comparison
      if (user.password === password) {
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




// router.post('/api/signin', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await Login.findOne({ username });

//     if (user) {
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (isPasswordValid) {
//         return res.json({ success: true });
//       } else {
//         return res.json({ success: false, message: 'Invalid credentials' });
//       }
//     } else {
//       return res.json({ success: false, message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error("Error in sign-in:", error);
//     return res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// });



router.put('/password/update/:username', async (req, res) => {
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

    const updatedUser = await Login.findOneAndUpdate(
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






