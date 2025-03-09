const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export {
  API_BASE_URL,
  API_OPTIONS,
  API_KEY,
  IMAGE_BASE_URL,
}