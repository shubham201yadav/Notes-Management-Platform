const express = require("express");
const router = express.Router();
const User = require("../models/User");
let Course;
try {
  Course = require("../models/Course");
} catch (e) {
  // Course model not defined; dashboard will fall back to 0
  Course = null;
}

router.get("/dashboard", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const courses = Course ? await Course.countDocuments() : 0;
    
    // Example revenue logic
    const revenue = 52000; // replace with real calculation

    res.json({
      users,
      courses,
      revenue,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;