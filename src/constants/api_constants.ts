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

const POSTER_URL = (poster_path: string, poster_size = 500) => `${IMAGE_BASE_URL}/w${poster_size}${poster_path}`;

export {
  API_BASE_URL,
  API_OPTIONS,
  API_KEY,
  POSTER_URL,
}