import React from 'react';
import { connect } from 'react-redux';
import FilmView from './Home/Film/FilmView.js';
import MusiqueView from './Home/Musique/MusiqueView.js';
import Login from './Connexion/Login.js';
import Register from './Connexion/Register.js';
import InscriptionConfirmation from './Connexion/InscriptionConfirmation.js';
import TrackView from './Home/Musique/TrackView.js';
import FavoriteFilmView from './Home/Film/FavoriteFilmView.js';
import MovieCard from './Home/Film/MovieCard.js';
import Carousel from './Home/Film/Carousel.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Banner from './Home/Banner';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';

import userIcon from '../user.png';
import moviesIcon from '../movies_icon.png';
import { MenuList } from '@material-ui/core';

import loadFavoriteList from '../actions/loadFavoriteList.js';
import loadPopularMovies from '../actions/loadPopularMovies.js';
import loadRecommandationsMovies from '../actions/loadRecommandationsMovies.js';

import removeMovieInFavoriteList from '../actions/removeMovieInFavoriteList.js';
import addMovieInFavoriteList from '../actions/addMovieInFavoriteList.js';


import './App.css';

const style = {
	iconConnexion: {
		width: '50px',
		height:'50px'
	},
	welcome: {
		color:'#f16e00',
		fontSize: '15px',
		marginRight: '10px',
		marginTop: '15px'
	},
	connexionButton: {
		backgroundColor: '#f16e00'
	},
	appBar: {
		backgroundColor: 'black'
	},
	userIcon: {
		height: '50px',
		width: '50px',
		marginTop: '5px'
	}
};

class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
    		open: false,
				show: "home",
				usernameSession: "",
				passwordSession: "",
	    };
	  }
	
	componentWillReceiveProps(nextProps) {
	  
  }

  componentWillMount() {
		this.props.loadPopularMovies();
  }
  handleChangeDrawer = () => {
		if(this.props.connexionTest === "USER_CONNECTED") {
			 this.setState({open: !this.state.open});
		}
  }
  handleChangeFilm = () => {
		this.setState({show: "film"});
		this.props.reset();
	  this.handleChangeDrawer();
  }
  handleChangeHome = () => {
		if(this.state.show === "home") {
			window.location.reload();
		}
		this.setState({show: "home"});
		this.props.reset();
  }
  handleChangeMusique = () => {
		this.setState({show: "musique"});
		this.props.reset();
	  this.handleChangeDrawer();
	}
	
	handleChangeInscriptionConfirmation = (username,pass) => {
		this.setState({
			show: "inscription_confirmation",
			usernameSession: username,
			passwordSession:pass
		});
	}

	handleChangeConnexion = (username,pass) => {
		this.setState({
			show: "home",
			usernameSession: username,
			passwordSession:pass
		});
		this.props.loadFavoriteList(username).then((response) => {
			this.props.loadRecommandationsMovies(username);
		});
		
	}

	handleConnexionClick = () => {
		this.setState({show: "connexion"});
	}

	handleSignOutClick = () => {
		this.props.deconnexion();
		this.setState({show: "home",usernameSession:"",passwordSession:""});
	}
	handleInscriptionClick = () => {
		this.setState({show: "inscription"});
	}
  
  handleChangeTrack = () => {
		this.setState({show: "track"});
		this.props.reset();
    this.handleChangeDrawer();
	}
	
	handleChangeFavoriteMovies = () => {
    this.setState({show: "favoriteMovies"});
    this.handleChangeDrawer();
	}
	

	addMovieInFavoriteList = (movie) => {
		this.props.favoriteMovieList.filter(l => l.title === movie.title).length > 0 ? 
			this.props.removeMovieInFavoriteList(this.props.username,movie.title) : 		
			this.props.addMovieInFavoriteList(this.props.username,movie.title);
	}

  getContent = () => {
	  if(this.state.show === "home") {
		  return (
					<div>
						<Banner appName={this.props.appName}/>  
						{this.props.connexionTest === "USER_CONNECTED" && this.props.recommandationMovieList.length > 0 &&
							<div>
								<Carousel title="Popular movies">
									{this.props.popularMovieList.map(movie => (
										<MovieCard
											movie={movie}
											favoriteList={this.props.favoriteMovieList}
											onAddListPressed={movie => this.addMovieInFavoriteList(movie)}
										/>
									))}
								</Carousel>
							
								<Carousel title="Recommandations movies">
								{this.props.recommandationMovieList.map(movie => (
									<MovieCard
										movie={movie}
										favoriteList={this.props.favoriteMovieList}
										onAddListPressed={movie => this.addMovieInFavoriteList(movie)}
									/>
								))}
								</Carousel>
							</div>
						}
						
					</div>
				
		  )
	  }
	  else if(this.state.show === "film"){
		  return (
				  <FilmView username={this.state.usernameSession}/>
		  )
	  }
	  else if(this.state.show === "musique"){
		  return (
				  <MusiqueView />
		  )
		} 
		else if(this.state.show === "connexion") {
			return (
				<Login handleChangeConnexion={this.handleChangeConnexion} handleChangeInscriptionConfirmation={this.handleChangeInscriptionConfirmation} />
			)
		}
		else if(this.state.show === "inscription") {
			return (
				<Register handleChangeHome={this.handleChangeHome}/>
			)
		}
		else if(this.state.show === "inscription_confirmation") {
			return (
				<InscriptionConfirmation handleChangeConnexion={this.handleChangeConnexion} username={this.state.usernameSession} password={this.state.passwordSession}/>
			)
		}
		else if (this.state.show === "track"){
		  return (
		    <TrackView />
		    )
		}
		else if (this.state.show === "favoriteMovies"){
		  return (
		    <FavoriteFilmView username={this.state.usernameSession}/>
		    )
		}
    };
  
  setIconMenuOpen = (bool) => {
		this.setState({iconMenuOpened: bool});
	};

  render() {
      return (
        <div>
					<MuiThemeProvider>
						<div className="home-page">
							<AppBar
								iconClassNameRight="muidocs-icon-navigation-expand-more"
								title="YukArt"
								onLeftIconButtonClick={this.handleChangeDrawer}
								onTitleClick={this.handleChangeHome}
								style={style.appBar}
								titleStyle={{color: '#f16e00'}}
							>  
							{this.props.connexionTest === "USER_CONNECTED" && 
							<h2 style={style.welcome}>
								HELLO {this.props.username.toUpperCase()}
							</h2>
							}
							<IconMenu
								iconButtonElement={!(this.props.connexionTest === "USER_CONNECTED") && <RaisedButton buttonStyle={style.connexionButton} label="Connexion" primary={true}/> || (this.props.connexionTest === "USER_CONNECTED") && <img style={style.userIcon} src={userIcon} alt="userIcon" />}
								anchorOrigin={{horizontal: 'left', vertical: 'top'}}
								targetOrigin={{horizontal: 'left', vertical: 'top'}}
								menuStyle={style.connexionButton}
							>
								{this.props.connexionTest === "USER_CONNECTED" && 
									<MenuItem primaryText="Sign out" onClick={this.handleSignOutClick} style={style.connexionButton}/>
								}
								{!(this.props.connexionTest === "USER_CONNECTED") && 
									<div>
										<MenuItem primaryText="Se connecter" onClick={this.handleConnexionClick} style={style.connexionButton}/>
										<MenuItem primaryText="S'inscrire" onClick={this.handleInscriptionClick} style={style.connexionButton}/>
									</div>
								}
								
							</IconMenu>
					
							</AppBar>
							<Drawer
								docked={false}
								width={200}
								open={this.state.open}
								onRequestChange={(open) => this.setState({open})}>
							
								<AppBar title="Menu" style = {{backgroundColor: '#f16e00'}} onLeftIconButtonClick={this.handleChangeDrawer}/>
								<MenuList style={{backgroundColor: '#595959'}}>
								<MenuItem
										primaryText={"MOVIES"}
										style={{color: 'white'}}
										onClick={this.handleChangeFilm}
								/>
								<MenuItem
										primaryText={"ARTISTS"}
										style={{color: 'white'}}
										onClick={this.handleChangeMusique}
								/>
								<MenuItem
										primaryText={"TRACKS"}
										style={{color: 'white'}}
									onClick={this.handleChangeTrack}
								/>
								<MenuItem
										primaryText={""}
										style={{backgroundColor: 'white'}}
										onClick={() => ""}
								/>
								<MenuItem
										primaryText={"FAVORITE MOVIES"}
										style={{color: 'white'}}
										onClick={this.handleChangeFavoriteMovies}
								/>
								</MenuList>
					
							</Drawer>
										
							{this.getContent()}

						</div>
					</MuiThemeProvider>
		

				</div>
      );
	    
  }
}
const mapStateToProps = state => {
  return {
		appName: state.common.appName,
		connexionTest: state.common.connexion,
		username: state.common.username,
		popularMovieList: state.common.popularMovieList,
		favoriteMovieList: state.common.favoriteMovieList,
		recommandationMovieList: state.common.recommandationMovieList,
  }};

const mapDispatchToProps = dispatch => ({
	deconnexion: () => 
		dispatch(
		{
			type : 'DECONNEXION_SUCCESS',
			items : null,
			error : null
		}),
	loadFavoriteList: (username) => dispatch(loadFavoriteList(username)),
	loadPopularMovies: () => dispatch(loadPopularMovies()),
	loadRecommandationsMovies: (username) => dispatch(loadRecommandationsMovies(username)),
	reset: () => 
		dispatch(
		{
			type : 'RESET_SUCCESS',
			items : null,
			error : null
		}),
	addMovieInFavoriteList: (username, title) => dispatch(addMovieInFavoriteList(username,title)),
	removeMovieInFavoriteList: (username, title) => dispatch(removeMovieInFavoriteList(username,title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
