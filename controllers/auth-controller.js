const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, password, age, email, role } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        status: "failed",
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashPassword,
      age,
      role: role || "user",
      email,
    });

    newUser.save();

    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "user created successfully",
        userdata: {
          username,
          email,
          age,
          role,
        },
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "user could not be created",
      });
    }
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({
      success: false,
      message: "Error creating user!",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "15m" }
    );
    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log("Error registering user: ", error);
    res.status(500).json({ success: false, message: "Error logging in user" });
  }
};

module.exports = { registerUser, loginUser };
