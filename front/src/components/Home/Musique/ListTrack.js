import React from 'react';
import TrackCard from './TrackCard';

class ListTrack extends React.Component {

  render() {
    return (
      <div className="movie-list-container">
      <ol className="movie-list-grid">
        {this.props.tracks.map(track => (
          <li key={track.name}>
            <TrackCard
              track={track}
              favoriteList={this.props.favoriteList}
              onAddListPressed={track => this.props.onAddListPressed(track)}
            />
          </li>
        ))}
      </ol>
     </div>
    );

  }
}

export default ListTrack;