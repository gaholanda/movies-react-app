import React from 'react';
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { Search } from './components/Search';
import { getMovieList } from './api/movies';
import { Movie } from   './interfaces/Movie';
import { Loading } from './components/Loading';
import { MovieCard } from './components/MovieCard';
import { TrendingMovieCard } from './components/TrendingMovieCard';
import { updateSearchCount, getTrendingMovies } from './appwrite';
import { AppwriteDocument } from './interfaces/Appwrite';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState<AppwriteDocument[]>([]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage(''); 
    try{
      const data = await getMovieList(query);
      setMovieList(data.results);
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies || []);
    } catch (error) {
      console.error(`Èrror fetching trending movies: ${error}`);
    }
  }

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
            {
              trendingMovies.map((movie, index) => (
                <TrendingMovieCard key={movie.$id} index={index} movie={movie} />
              ))
            }
          </ul>
        </section>

        <section className="all-movies">
          <h2>All movies</h2>

          {
            isLoading ? 
            (
              <Loading />
            ) : errorMessage ?
            (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {
                  movieList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                }
              </ul>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App;
