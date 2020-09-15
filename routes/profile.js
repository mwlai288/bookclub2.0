const express = require("express");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require("normalize-url");
const checkObjectId = require("../middleware/checkObjectId");

const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//  @route   POST /api/profile
//  @desc    Create or Edit user profile
//  @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("username", "Username is required").not().isEmpty(),
      check("genres", "Enter a few genres to begin").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Check Validation
    if (!errors.isEmpty()) {
      // Return any errors with 400 status
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, bio, genres, twitter, facebook, instagram } = req.body;

    // Build Profile Object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (username) profileFields.username = username;
    if (bio) profileFields.bio = bio;
    if (genres) {
      profileFields.genres = genres.split(",").map((genre) => genre.trim());
    }

    // Social
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//  @route   GET /api/profile
//  @desc    Get all profiles
//  @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

//  @route   GET /api/profile/:user_id
//  @desc    Get profile by user ID
//  @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (error) {
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json({ profile: "There are no profiles" });
  }
});

// @route   DELETE /api/profile
// @desc    Delete everything from profile
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/profile/books
// @desc    Add profile books
// @access  Private
router.put(
  "/books",
  [
    auth,
    [
      check("title", "Enter a title").not().isEmpty(),
      check("authors", "Enter author(s)").not().isEmpty(),
      check("description", "Enter a description of the book").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

    const { title, subtitle, authors, description, imageLink } = req.body;

    const newBook = {
      title,
      subtitle,
      authors,
      description,
      imageLink,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.books.unshift(newBook);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE /api/profile/books/:book_id
// @desc    Delete a book from profile
// @access  Private
router.delete("/books/:book_id", auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.books = foundProfile.books.filter(
      (book) => book._id.toString() !== req.params.book_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
