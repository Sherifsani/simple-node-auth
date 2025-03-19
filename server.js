require("dotenv").config();

const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDb();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)

app.listen(PORT, () => {
  console.log(`server is now running on port ${PORT}`);
});
