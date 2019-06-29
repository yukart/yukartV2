import React from 'react';
import MovieCard from './MovieCard';

class ListMovies extends React.Component {

  render() {
    return (
      <div className="movie-list-container">
      <ol className="movie-list-grid">
        {this.props.movies.map(movie => (
          <li key={movie.title}>
            <MovieCard
              movie={movie}
              favoriteList={this.props.favoriteList}
              onAddListPressed={movie => this.props.onAddListPressed(movie)}
            />
          </li>
        ))}
      </ol>
     </div>
    );

  }
}

export default ListMovies;