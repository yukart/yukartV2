import React from 'react';
import Button from '../Button';

const TRUNCATE_LENGTH = 100;

class MovieCard extends React.Component {

  render() {
    return (
      <div
        style={{      
          backgroundColor: '#202020',
          backgroundImage: "url("+this.props.movie.poster_url+")"
        }}
        className="movie-card"
      >
        <div className="movie-card-container">
          <div className="movie-card-text">
            <div className="movie-card-title">{this.props.movie.title}</div>
            <div className="movie-card-info">
              <div className="movie-card-year">{this.props.movie.release_date}</div>
              <div className="movie-card-rating">{this.props.movie.rating}</div>
            </div>
            <div className="movie-card-description">{this.props.movie.synopsis ? this.props.movie.synopsis.substring(0, TRUNCATE_LENGTH) + '...' : 'No description'}</div>
          </div>
          <div className="movie-card-button-container">
            <Button
              icon={this.props.favoriteList.filter(l => l === this.props.movie.title).length ? 'check' : 'plus'}
              onButtonPressed={() => this.props.onAddListPressed(this.props.movie.title)}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MovieCard;
