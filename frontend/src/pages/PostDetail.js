import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getPost, likePost, unlikePost, addComment } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const loadPost = async () => {
    try {
      const response = await getPost(postId);
      setPost(response.data);
      setIsLiked(response.data.likes.includes(user?.id));
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
      setIsLiked(!isLiked);
      loadPost();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment(postId, comment);
      setComment('');
      loadPost();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="post-detail-container">
        <div className="post-detail-card">
          <div className="post-detail-image">
            <img src={post.imageUrl} alt="Post" />
          </div>
          
          <div className="post-detail-sidebar">
            <div className="post-detail-header">
              <Link to={`/profile/${post.user._id}`} className="detail-username">
                {post.user.username}
              </Link>
            </div>
            
            <div className="post-detail-content">
              {post.caption && (
                <div className="detail-caption">
                  <Link to={`/profile/${post.user._id}`}>
                    <strong>{post.user.username}</strong>
                  </Link>
                  <span>{post.caption}</span>
                </div>
              )}
              
              <div className="comments-list">
                {post.comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <Link to={`/profile/${comment.user._id}`}>
                      <strong>{comment.user.username}</strong>
                    </Link>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="post-detail-actions">
              <button onClick={handleLike} className="detail-like-btn">
                {isLiked ? '❤️' : '🤍'}
              </button>
              <div className="likes-count">
                {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
              </div>
            </div>
            
            <form onSubmit={handleAddComment} className="comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
              />
              <button 
                type="submit" 
                disabled={!comment.trim()}
                className="comment-submit"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;