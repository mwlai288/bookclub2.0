const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// Load Post Model
const Post = require("../models/Post");
// Load Profile Model
const Profile = require("../models/Profile");
const User = require("../models/User");

// Post Validation

// @route   POST /api/posts
// @desc    Create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET /api/posts
// @desc    Get all post
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const post = await Post.findById(req.params.id);

    // Check for post owner
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }

    // Delete
    post.remove().then(() => res.json({ success: true }));
  } catch (error) {
    if (err.kind === "ObjectId")
      res.status(404).json({ msg: "Post not found" });
  }
});

// @route   POST /posts/like/:id
// @desc    Like post
// @access  Private
router.post("/like/:id", auth, async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const postToLike = await Post.findById(req.params.id);

    if (
      postToLike.likes.filter((like) => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res
        .status(400)
        .json({ liked: "You can like the same post only once" });
    }

    // Add user id to likes array
    postToLike.likes.unshift({ user: req.user.id });
    const saveLike = await postToLike.save();
    res.json(saveLike);
  } catch (error) {
    res.status(404).json({ postnotfound: "No post found" });
  }
});

// @route   POST /posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post("/unlike/:id", auth, async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const unlikePost = await Post.findById(req.params.id);

    if (
      unlikePost.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ notliked: "You have not yet liked this post" });
    }

    // Get remove index
    const removeIndex = unlikePost.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);
    // Splice out of array
    unlikePost.likes.splice(removeIndex, 1);
    // Save
    const postUnliked = await unlikePost.save();
    res.json(postUnliked);
  } catch (error) {
    res.status(404).json({ postnotfound: "No post found" });
  }
});

// @route   PUT /api/posts/like/:id/
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/posts/unlike/:id/
// @desc    Remove a like from post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
    const removeIndex = post
      .likes(map((like) => like.user.toString()))
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    // checkObjectId('id'),
    [check("text", "Text is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
