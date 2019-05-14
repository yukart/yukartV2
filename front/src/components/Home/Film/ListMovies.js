import React from 'react';
import MovieCard from './MovieCard';

const ListMovies = ({ movies, favoriteList, title, onAddListPressed }) => (
  <div className="movie-list-container">
    <ol className="movie-list-grid">
      {movies.map(movie => (
        <li key={movie.title}>
          <MovieCard
            movie={movie}
            favoriteList={favoriteList}
            onAddListPressed={movie => onAddListPressed(movie)}
          />
        </li>
      ))}
    </ol>
  </div>
);

export default ListMovies;
