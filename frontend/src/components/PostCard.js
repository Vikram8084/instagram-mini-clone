import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { likePost, unlikePost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PostCard.css';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.likes?.includes(user?.id) || false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post._id);
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await likePost(post._id);
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/profile/${post.user._id}`} className="post-username">
          {post.user.username}
        </Link>
      </div>
      
      <img src={post.imageUrl} alt="Post" className="post-image" />
      
      <div className="post-actions">
        <button onClick={handleLike} className="action-btn">
          {isLiked ? '❤️' : '🤍'} {likesCount}
        </button>
        <Link to={`/post/${post._id}`} className="action-btn">
          💬 {post.comments?.length || 0}
        </Link>
      </div>
      
      {post.caption && (
        <div className="post-caption">
          <strong>{post.user.username}</strong> {post.caption}
        </div>
      )}
    </div>
  );
};

export default PostCard;