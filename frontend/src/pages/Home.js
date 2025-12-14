import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { getFeed } from '../services/api';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    try {
      const response = await getFeed();
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading feed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="feed">
          {loading ? (
            <div className="loading">Loading feed...</div>
          ) : posts.length === 0 ? (
            <div className="empty-feed">
              <p>No posts yet!</p>
              <p>Follow some users to see their posts here.</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post._id} post={post} onUpdate={loadFeed} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;