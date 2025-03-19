const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.status(200).json({
        status: "success",
        message: "successfully fetched all users",
        data: users,
      });
    } else {
      return res.status(404).json({
        success: "failed",
        message: "no user(s) found",
      });
    }
  } catch (error) {
    console.log("error fetching users: ", error);
    res.status(500).json({
      status: "failed",
      message: "Error fetching users",
    });
  }
};

const getUserById = async (req, res) => {};

module.exports = { getAllUsers, getAllUsers };
