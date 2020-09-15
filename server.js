const express = require("express");
const connectDB = require("./config/db");
const users = require("./routes/users");
const profile = require("./routes/profile");
const posts = require("./routes/posts");
const auth = require("./routes/auth");

const app = express();

// Body parser middleware
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectDB();

// Use Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT}`);
});
