import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import removeMovieInFavoriteList from '../../../actions/removeMovieInFavoriteList.js'

import Banner from '../Banner';
import ListMovies from './ListMovies';

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

class FavoriteFilmView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    };
	  }
  componentWillMount() {
		
  }

  componentWillUnmount() {

  }

  addMovieInFavoriteList = (movie) => {
			this.props.removeMovieInFavoriteList(this.props.username,movie.title);	
	}

  render() {
    return (
    			<Paper zDepth={5}>
    				<Banner appName={this.props.appName}/>
						<div className="container page">
								<h1 style={{color: '#f16e00'}}> Favorite movies </h1>
								<div className="row">

									<ListMovies
										movies={this.props.favoriteList}
										favoriteList={this.props.favoriteList}
										onAddListPressed={movie => this.addMovieInFavoriteList(movie)}
									/>
							

								</div>
						</div>
					</Paper>

    	   
    );
  }
}
const mapStateToProps = state => ({
  appName: state.common.appName,
	favoriteList: state.common.favoriteMovieList,
});

const mapDispatchToProps = dispatch => ({
	removeMovieInFavoriteList: (username, title) => dispatch(removeMovieInFavoriteList(username,title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteFilmView);
