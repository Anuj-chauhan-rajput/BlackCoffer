require("dotenv").config(); // ✅ load .env file

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)  // ✅ use the correct, working URI
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

async function createUser() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const user = new User({
    email: "admin@demo.com",
    password: hashedPassword,
  });

  await user.save();
  console.log("✅ User created: admin@demo.com / admin123");
  mongoose.disconnect();
}

createUser();
