import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

export const getUserProfile = (userId) => api.get(`/users/${userId}`);
export const followUser = (userId) => api.post(`/users/${userId}/follow`);
export const unfollowUser = (userId) => api.post(`/users/${userId}/unfollow`);

export const getFeed = () => api.get('/posts/feed');
export const createPost = (data) => api.post('/posts', data);
export const getPost = (postId) => api.get(`/posts/${postId}`);
export const likePost = (postId) => api.post(`/posts/${postId}/like`);
export const unlikePost = (postId) => api.delete(`/posts/${postId}/like`);
export const addComment = (postId, text) => api.post(`/posts/${postId}/comment`, { text });

export default api;