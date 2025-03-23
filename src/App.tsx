import React from 'react';
import { useState, useEffect } from 'react';
import { Search } from './components/Search';
import { getMovieList } from './api/movies';
import { Movie } from   './interfaces/Movie';
import { Loading } from './components/Loading';
import { MovieCard } from './components/MovieCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage(''); 
    try{
      const data = await getMovieList(query);
      setMovieList(data.results);
    } catch (error) {
      setErrorMessage(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>

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
