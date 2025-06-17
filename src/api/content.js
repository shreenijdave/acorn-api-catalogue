// src/api/content.js
import axios from 'axios';

export const fetchCatalogueItems = async () => {
  const response = await axios.get('http://localhost:5000/api/content');
  return response.data.data.items; // <- Extract items array
};
