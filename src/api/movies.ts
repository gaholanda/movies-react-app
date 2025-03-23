import { API_BASE_URL, API_OPTIONS } from '../constants/api_constants';
import { MovieList } from '../interfaces/Movie';
const ERROR_MESSAGE = 'An error occurred while trying to fetch movies. Please try again later.';

const getMovieList = async (query = ''): Promise<MovieList> => {
  const list = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const search = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
  const endpoint = query ? search : list;
  const response = await fetch(endpoint, API_OPTIONS);

  if(!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  if(data.Response === 'False') {
    throw new Error(data.Error || ERROR_MESSAGE);
  }

  return data;
}

export {
  getMovieList
}