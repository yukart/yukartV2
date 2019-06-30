import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import removeMovieInFavoriteList from '../../../actions/removeMovieInFavoriteList.js';
import addMovieInFavoriteList from '../../../actions/addMovieInFavoriteList.js';
import searchFilmByTitle from '../../../actions/searchFilmByTitle.js';

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

class FilmView extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
    		open: false,
				value: "",
				loading: false,
	    };
	  }
  componentWillMount() {

  }

  componentWillUnmount() {

  }

  handleChange = (event) => {
	    this.setState({
	      value: event.target.value,
	    });
	  };
  handleButton = () => {
		this.setState({
			loading: true,
	 	});
		this.props.updateListFilms(this.state.value).then((response) => {
			this.setState({
				value: "",
				loading: false
			});
		});
  };

  addMovieInFavoriteList = (movie) => {
		this.props.favoriteList.filter(l => l.title === movie.title).length > 0 ? 
			this.props.removeMovieInFavoriteList(this.props.username,movie.title) : 		
			this.props.addMovieInFavoriteList(this.props.username,movie.title);
	}

  render() {
    return (
    			<Paper zDepth={5}>
    				<Banner appName={this.props.appName}/>
						<div className="container page">
	    				<div>
    					<TextField
	    		          id="text-field-controlled"
	    		          value={this.state.value}
	    		          onChange={this.handleChange}
	    		        />
	    			    <RaisedButton label="Search" primary={true} buttonStyle={{backgroundColor: '#f16e00'}} onClick={this.handleButton}/>
	    			    </div>
	    				<div className="row">
								{this.props.film !== null && this.props.film.length !== 0 && !this.state.loading && 
									<div>
										<h1 style={{color: '#f16e00'}}> Your research : </h1>
										<ListMovies
											movies={this.props.film}
											favoriteList={this.props.favoriteList}
											onAddListPressed={movie => this.addMovieInFavoriteList(movie)}
										/>
									</div>
								}
								{this.props.film !== null && this.state.loading &&
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
	film: state.common.film,
	favoriteList: state.common.favoriteMovieList,
});

const mapDispatchToProps = dispatch => ({
	updateListFilms: (name) => dispatch(searchFilmByTitle(name)),
	addMovieInFavoriteList: (username, title) => dispatch(addMovieInFavoriteList(username,title)),
	removeMovieInFavoriteList: (username, title) => dispatch(removeMovieInFavoriteList(username,title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmView);
