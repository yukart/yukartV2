import React from 'react';
import Button from '../Button';

const TRUNCATE_LENGTH = 100;

class TrackCard extends React.Component {

  render() {
    return (
      <div
        style={{      
          backgroundColor: '#202020',
          boxShadow: '8px 8px 12px #555',
          backgroundImage: "url("+this.props.track.album.images[0].url+")"
        }}
        className="movie-card"
      >
        <div className="movie-card-container">
          <div className="movie-card-text">
            <div className="movie-card-title">{this.props.track.name}</div>
            <div className="movie-card-info">
              <div className="movie-card-description">{this.props.track.artists.map((artist)=>artist.name+"/ ")}</div>
              <div className="movie-card-year">{this.props.track.duration}</div>
              <div className="movie-card-rating">{this.props.track.popularity}</div>
              <a href={this.props.track.externalUrls.externalUrls.spotify} target = "_blank" alt ="lien spotify">Listen on spotify</a>
            </div>
          </div>
          <div className="movie-card-button-container">
            <Button
              icon={this.props.favoriteList.filter(l => l.title === this.props.movie.title).length ? 'check' : 'plus'}
              onButtonPressed={() => this.props.onAddListPressed({
                name: this.props.track.name,
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default TrackCard;
