require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection failed:", err));

async function createUser() {
  const existing = await User.findOne({ email: "admin@demo.com" });
  if (existing) {
    console.log("⚠️ User already exists.");
    mongoose.disconnect();
    return;
  }

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
