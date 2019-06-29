import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import searchTrack from '../../../actions/searchTrack.js';
import Banner from '../Banner';

const style = {
  paper: {
    height: '75%',
    width: '75%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  puce: {
    listStyleType: 'none'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  gridItem: {
    textAlign: 'center',
  }
};

class TrackView extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        open: false,
        value: "",
      };
    }
    
    
  componentWillMount() {
   

  }

  componentWillUnmount() {

  }

  handleChangeTrack = (event) => {
    this.setState({
      valueTrack : event.target.value,
    });
  };
    
  handleButtonTrack = () => {
    this.props.updateListTrack(this.state.valueTrack);
    this.props.reset();
    this.setState({
        valueTrack: ""
    });
  };
  
  render() {
    return (
        <Paper zDepth={5}>
            <Banner appName={this.props.appName}/>
            <div className="container page">
              <div style={style.gridContainer}>
                <div style={style.gridItem}>
                  <TextField
                      id="text-field-controlled"
                      value={this.state.valueTrack}
                      onChange={this.handleChangeTrack}
                    />
                  <RaisedButton label="Search track" primary={true} buttonStyle={{backgroundColor: '#f16e00'}} onClick={this.handleButtonTrack}/>
                </div>
              </div>
              <div className="row">
                {this.props.track !== null && this.props.track.length !== 0 &&
                  <h1 style={{color: '#f16e00'}}> Your research : </h1>
                }
                {this.props.track !== null && this.props.track.length !== 0 &&
                  this.props.track.map((track) => 
                    <Paper style={style.paper} zDepth={2}>
                     {track.album.images[0] !== undefined &&
                        <img alt="poster" width="25%" src={track.album.images[0].url}/>
                      }
                      <ul>
                        <li style={style.puce}>Nom : {track.name} </li>
                        <li style={style.puce}>Durée : {track.duration} </li>
                        <li style={style.puce}>Artiste(s) : {track.artists.map((artist) => artist.name+"; ")} </li>
                        <li style={style.puce}>Popularité: {track.popularity}%</li>
                        <li style={style.puce}> <a href={track.externalUrls.externalUrls.spotify} target="_blank" alt="lien spotify"> Ecouter cette chanson</a>  </li>
                      </ul>
                    </Paper>
                  )
                }
                {this.props.track !== null && this.props.track === "" &&
                  <Paper style={style} zDepth={2}>
                    <p> Track not found : error 404 !!! </p>
                  </Paper>
                }
              </div>
            </div>
          </Paper>

       
  );
  }
}
const mapStateToProps = state => ({
  appName: state.common.appName,
  track: state.common.track,
});

const mapDispatchToProps = dispatch => ({
  updateListTrack: (name) => dispatch(searchTrack(name)),
  reset: () => 
    dispatch({
              type : 'RESET',
              items : null,
              error : null,
              }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackView);
