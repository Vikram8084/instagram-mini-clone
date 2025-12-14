import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserProfile, followUser, unfollowUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await getUserProfile(userId);
      setProfile(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (profile.user.isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      loadProfile();
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <Navbar />
        <div className="error">Profile not found</div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.user.username.charAt(0).toUpperCase()}
          </div>
          
          <div className="profile-info">
            <div className="profile-top">
              <h2>{profile.user.username}</h2>
              {!isOwnProfile && (
                <button 
                  onClick={handleFollow}
                  className={`follow-btn ${profile.user.isFollowing ? 'following' : ''}`}
                >
                  {profile.user.isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <strong>{profile.posts.length}</strong> posts
              </div>
              <div className="stat">
                <strong>{profile.user.followersCount}</strong> followers
              </div>
              <div className="stat">
                <strong>{profile.user.followingCount}</strong> following
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-posts">
          <h3>Posts</h3>
          {profile.posts.length === 0 ? (
            <div className="no-posts">No posts yet</div>
          ) : (
            <div className="posts-grid">
              {profile.posts.map(post => (
                <div key={post._id} className="grid-post">
                  <img src={post.imageUrl} alt={post.caption} />
                  <div className="grid-overlay">
                    <span>❤️ {post.likes.length}</span>
                    <span>💬 {post.comments.length}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;