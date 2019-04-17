import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import searchArtist from '../../../actions/searchArtist.js';
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

class MusiqueView extends React.Component {
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

  handleChangeArtist = (event) => {
    this.setState({
      valueArtist : event.target.value,
    });
  };
    
  handleButtonArtist = () => {
    this.props.updateListArtist(this.state.valueArtist);
    this.props.reset();
    this.setState({
        valueArtist: ""
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
                      value={this.state.valueArtist}
                      onChange={this.handleChangeArtist}
                    />
                  <RaisedButton label="Search artist" primary={true} onClick={this.handleButtonArtist}/>
                </div>
              </div>
              <div className="row">
                {this.props.artist !== null && this.props.artist.length !== 0 &&
                  <h1> Your research : </h1>
                }
                {this.props.artist !== null && this.props.artist.length !== 0 &&
                  this.props.artist.map((artist) => 
                    <Paper style={style.paper} zDepth={2}>
                      {artist.images[0] !== undefined &&
                        <img alt="poster" width="25%" src={artist.images[0].url}/>
                      }
                      <ul>
                        <li style={style.puce}>Name : {artist.name} </li>
                        <li style={style.puce}>Genres : {artist.genres.map((genre) => genre+"; ")} </li>
                        <li style={style.puce}>Popularité: {artist.popularity}%</li>
                        <li style={style.puce}> <a href={artist.externalUrls.externalUrls.spotify} target="_blank" alt="lien spotify"> Ecouter cet artiste</a>  </li>
                      </ul>
                    </Paper>
                  )
                }
                {this.props.artist !== null && this.props.artist === "" &&
                  <Paper style={style} zDepth={2}>
                    <p> Artist not found : error 404 !!! </p>
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
  artist: state.common.artist,
});

const mapDispatchToProps = dispatch => ({
  updateListArtist: (name) => dispatch(searchArtist(name)),
  reset: () => 
    dispatch({
              type : 'RESET',
              items : null,
              error : null,
              }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusiqueView);
