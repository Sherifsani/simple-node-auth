const express = require('express')
const router = express.Router()
const adminMiddleware = require("../middleware/admin-middleware")
const authMiddleware = require("../middleware/auth-middleware");

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
    const { userId, username, email, role } = req.userInfo;
    res.json({
      message: "Welcome to the admin dashboard",
      user: {
        userId,
        username,
        email,
        role,
      },
    });
})

module.exports = router