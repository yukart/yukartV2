import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import removeTrackInFavoriteList from '../../../actions/removeTrackInFavoriteList.js';
import addTrackInFavoriteList from '../../../actions/addTrackInFavoriteList.js';
import searchTrack from '../../../actions/searchTrack.js';
import Banner from '../Banner';
import ListTrack from './ListTrack';

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
        loading : false,
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
    this.setState({
			loading: true,
	 	});
    this.props.updateListTrack(this.state.valueTrack).then(() => {
      this.setState({
        valueTrack: "",
        loading: false
      });
    });
    
  };
    addTrackInFavoriteList = (track) => {
    this.props.favoriteList.filter(l => l.title === track.name).length > 0 ? 
      this.props.removeTrackInFavoriteList(this.props.username,track.name) :     
      this.props.addTrackInFavoriteList(this.props.username,track.name);
  }
  
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
                {this.props.track !== null && this.props.track.length !== 0 && !this.state.loading && 
                  <div>
                    <h1 style={{color: '#f16e00'}}> Your research : </h1>
                    <ListTrack 
                    tracks = {this.props.track}
                    favoriteList={this.props.favoriteList}
                    onAddListPressed={track => this.addTrackInFavoriteList(track)}
                    />
                  </div>
                }
                {this.props.track !== null && this.state.loading &&
                  <CircularProgress size={60} thickness={7} color={'#f16e00'}/>
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
  favoriteList: state.common.favoriteTrackList,

});

const mapDispatchToProps = dispatch => ({
  updateListTrack: (name) => dispatch(searchTrack(name)),
  addTrackInFavoriteList: (username, title) => dispatch(addTrackInFavoriteList(username,title)),
  removeTrackInFavoriteList: (username, title) => dispatch(removeTrackInFavoriteList(username,title)),
  reset: () => 
    dispatch({
              type : 'RESET',
              items : null,
              error : null,
              }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackView);
