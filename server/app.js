const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const adminRoutes = require("./routes/admin");
const notesRoutes = require("./routes/notesRoutes");
const uploadRoutes = require("./routes/upload");

const app = express();   // MUST BE HERE

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((url) => url.trim()).filter(Boolean)
    : []),
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

module.exports = app;