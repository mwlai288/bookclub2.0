const mongoose = require("mongoose");

// Create Schema
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  username: {
    type: String,
    required: true,
    max: 20,
  },
  genres: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
      },
      authors: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageLink: {
        type: String,
      },
    },
  ],
  social: {
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
