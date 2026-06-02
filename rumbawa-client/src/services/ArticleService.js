import axios from 'axios';
import constants from '../constants';

// API Access for articles
const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Fetch all articles
export const fetchArticles = () => API.get('/');

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article
export const deleteArticle = (id) => API.delete(`/${id}`);