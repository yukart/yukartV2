import React from 'react';
import Button from '../Button';

const TRUNCATE_LENGTH = 100;

const MovieCard = ({ movie, favoriteList, onAddListPressed }) => (
  <div
  
    style={{      
      backgroundColor: '#202020',
      backgroundImage: "url("+movie.poster_url+")"
    }}
    className="movie-card"
  >
    <div className="movie-card-container">
      <div className="movie-card-text">
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-info">
          <div className="movie-card-year">{movie.release_date}</div>
          <div className="movie-card-rating">{movie.rating}</div>
        </div>
        <div className="movie-card-description">{movie.synopsis ? movie.synopsis.substring(0, TRUNCATE_LENGTH) + '...' : 'No description'}</div>
      </div>
      <div className="movie-card-button-container">
        <Button
          buttonStyleOptions="round-button"
          iconStyleOptions="fa-fw"
          icon={favoriteList.filter(l => l.title === movie.title).length ? 'check' : 'plus'}
          onButtonPressed={() => onAddListPressed(movie)}
        />
      </div>
    </div>
  </div>
);

export default MovieCard;
