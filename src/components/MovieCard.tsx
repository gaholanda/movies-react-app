import React from 'react';
import { Movie } from '../interfaces/Movie';
import { POSTER_URL } from '../constants/api_constants';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { 
    title, 
    vote_average, 
    poster_path, 
    release_date, 
    original_language 
  } = movie;
  return (
    <li className="movie-card">
      <img src={poster_path ? POSTER_URL(poster_path) : '/no-movie.png' } alt={title} />
      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : ''}</p>
          </div>
          <p className="lang">{original_language}</p>
          <p className="year">{release_date ? release_date.split('-')[0] : ''}</p>
        </div>
      </div>
    </li>
  )
}
