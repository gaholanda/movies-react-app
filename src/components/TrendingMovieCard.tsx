import React from 'react';
import { AppwriteDocument } from '../interfaces/Appwrite';

interface TrendingMovieCardProps {
  index: number;
  movie: AppwriteDocument;
}

export const TrendingMovieCard: React.FC<TrendingMovieCardProps> = ({index, movie}) => {
  return (
    <li>
      <p>{index + 1}</p>
      <img src={movie.poster_url} alt={movie.title} />
    </li>
  )
}
