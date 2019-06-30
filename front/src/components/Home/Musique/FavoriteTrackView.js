import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import removeTrackInFavoriteList from '../../../actions/removeTrackInFavoriteList.js'

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
		}
};

class FavoriteTrackView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	  }
  componentWillMount() {
		
  }

  componentWillUnmount() {

  }

  addTrackInFavoriteList = (track) => {
			this.props.removeTrackInFavoriteList(this.props.username,track.name);	
	}

  render() {
    return (
    			<Paper zDepth={5}>
    				<Banner appName={this.props.appName}/>
						<div className="container page">
								<h1 style={{color: '#f16e00'}}> Favorite tracks </h1>
								<div className="row">

									<ListTrack
										tracks={this.props.favoriteList}
										favoriteList={this.props.favoriteList}
										onAddListPressed={movie => this.addTrackInFavoriteList(movie)}
									/>
							

								</div>
						</div>
					</Paper>

    	   
    );
  }
}
const mapStateToProps = state => ({
  appName: state.common.appName,
	favoriteList: state.common.favoriteTrackList,
});

const mapDispatchToProps = dispatch => ({
	removeTrackInFavoriteList: (username, title) => dispatch(removeTrackInFavoriteList(username,title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTrackView);
