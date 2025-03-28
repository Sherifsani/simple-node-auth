require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-route");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDb();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
