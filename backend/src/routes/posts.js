const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get feed (posts from followed users)
router.get('/feed', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    const posts = await Post.find({
      user: { $in: currentUser.following }
    })
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate('comments.user', 'username');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed', error: error.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    const post = new Post({
      user: req.userId,
      imageUrl,
      caption
    });

    await post.save();
    await post.populate('user', 'username');

    res.status(201).json({ message: 'Post created', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Get single post
router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'username')
      .populate('comments.user', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message });
  }
});

// Like post
router.post('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(req.userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(req.userId);
    await post.save();

    res.json({ message: 'Post liked', likesCount: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error: error.message });
  }
});

// Unlike post
router.delete('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes = post.likes.filter(id => id.toString() !== req.userId);
    await post.save();

    res.json({ message: 'Post unliked', likesCount: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking post', error: error.message });
  }
});

// Add comment
router.post('/:postId/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.userId,
      text
    });

    await post.save();
    await post.populate('comments.user', 'username');

    res.json({ 
      message: 'Comment added', 
      comment: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

module.exports = router;