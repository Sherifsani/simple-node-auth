const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

router.get("/welcome", authMiddleware, (req, res) => {
  const { userId, username, email, role } = req.userInfo;
  res.json({
    message: "Welcome to the home page!",
    user: {
      userId,
      username,
      email,
      role,
    },
  });
});

module.exports = router;
