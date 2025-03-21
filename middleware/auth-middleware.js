const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized!",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware