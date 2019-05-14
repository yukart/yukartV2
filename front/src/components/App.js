import React from 'react';
import { connect } from 'react-redux';
import FilmView from './Home/Film/FilmView.js';
import MusiqueView from './Home/Musique/MusiqueView.js';
import Login from './Connexion/Login.js';
import Register from './Connexion/Register.js';
import TrackView from './Home/Musique/TrackView.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Banner from './Home/Banner';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';

import userIcon from '../user.png';


const style = {
	iconConnexion: {
		width: '50px',
		height:'50px'
	},
	welcome: {
		fontFamily: 'Magneto',
		color:'white',
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
    		show: "home"
	    };
	  }
	
	componentWillReceiveProps(nextProps) {
	  
  }

  componentWillMount() {
	  
  }
  handleChangeDrawer = () => {
		if(this.props.connexion) {
			 this.setState({open: !this.state.open});
		}
  }
  handleChangeFilm = () => {
	  this.setState({show: "film"});
	  this.handleChangeDrawer();
  }
  handleChangeHome = () => {
		if(this.state.show === "home") {
			window.location.reload();
		}
	  this.setState({show: "home"});
  }
  handleChangeMusique = () => {
	  this.setState({show: "musique"});
	  this.handleChangeDrawer();
	}
	
	handleConnexionClick = () => {
		this.setState({show: "connexion"});
	}

	handleSignOutClick = () => {
		this.props.deconnexion();
		this.setState({show: "home"});
	}
	handleInscriptionClick = () => {
		this.setState({show: "inscription"});
	}
  
  handleChangeTrack = () => {
    this.setState({show: "track"});
    this.handleChangeDrawer();
  }
  getContent = () => {
	  if(this.state.show === "home") {
		  return (
					<Banner appName={this.props.appName}/>  
		  )
	  }
	  else if(this.state.show === "film"){
		  return (
				  <FilmView />
		  )
	  }
	  else if(this.state.show === "musique"){
		  return (
				  <MusiqueView />
		  )
		} 
		else if(this.state.show === "connexion") {
			return (
				<Login handleChangeHome={this.handleChangeHome} />
			)
		}
		else if(this.state.show === "inscription") {
			return (
				<Register handleChangeHome={this.handleChangeHome}/>
			)
		}
		else if (this.state.show === "track"){
		  return (
		    <TrackView />
		    )
		}
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
							{this.props.connexion && 
							<h2 style={style.welcome}>
								HELLO {this.props.username.toUpperCase()}
							</h2>
							}
							<IconMenu
								iconButtonElement={!this.props.connexion && <RaisedButton buttonStyle={style.connexionButton} label="Connexion" primary={true}/> || this.props.connexion && <img style={style.userIcon} src={userIcon} alt="userIcon" />}
								anchorOrigin={{horizontal: 'left', vertical: 'top'}}
								targetOrigin={{horizontal: 'left', vertical: 'top'}}
								menuStyle={style.connexionButton}
							>
								{this.props.connexion && 
									<MenuItem primaryText="Sign out" onClick={this.handleSignOutClick} style={style.connexionButton}/>
								}
								{!this.props.connexion && 
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
							
								<AppBar title="AppBar" onLeftIconButtonClick={this.handleChangeDrawer}/>
							
								<MenuItem
										primaryText={"Movies"}
										onClick={this.handleChangeFilm}
									/>
								<MenuItem
										primaryText={"Artists"}
									onClick={this.handleChangeMusique}
									/>
								<MenuItem
										primaryText={"Tracks"}
									onClick={this.handleChangeTrack}
									/>
					
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
		connexion: state.common.connexion,
		username: state.common.username,
  }};

const mapDispatchToProps = dispatch => ({
	deconnexion: () => 
		dispatch(
		{
			type : 'DECONNEXION_SUCCESS',
			items : null,
			error : null
		}),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
