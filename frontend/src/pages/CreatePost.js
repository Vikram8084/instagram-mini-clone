import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createPost } from '../services/api';
import './CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    caption: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="create-post-container">
        <div className="create-post-box">
          <h2>Create New Post</h2>
          
          <form onSubmit={handleSubmit} className="create-post-form">
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Caption</label>
              <textarea
                name="caption"
                placeholder="Write a caption..."
                value={formData.caption}
                onChange={handleChange}
                rows="4"
                className="form-textarea"
              />
            </div>
            
            {error && <div className="form-error">{error}</div>}
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-submit"
              >
                {loading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;