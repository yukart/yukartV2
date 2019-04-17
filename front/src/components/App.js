import React from 'react';
import { connect } from 'react-redux';
import FilmView from './Home/Film/FilmView.js';
import MusiqueView from './Home/Musique/MusiqueView.js';
import Login from './Connexion/Login.js';
import Register from './Connexion/Register.js';


import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Banner from './Home/Banner';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import Icon_connexion from 'material-ui/svg-icons/action/account-circle';

const style = {
	iconConnexion: {
		width: '50px',
		height:'50px'
	},
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
	  this.setState({open: !this.state.open});
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
	handleInscriptionClick = () => {
		this.setState({show: "inscription"});
	}
  getContent = () => {
	  if(this.state.show === "home") {
		  return (
				  <Paper zDepth={5}>
		  			<Banner appName={this.props.appName}/>
		  	        <div className="container page">
		  	          <div className="row">
		  	          	<p></p>
		  	          </div>
		  	        </div>
		  	     </Paper>	  
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
				<Login />
			)
		}
		else if(this.state.show === "inscription") {
			return (
				<Register />
			)
		}
  }
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
          >  

					<IconMenu
						iconButtonElement={<IconButton iconStyle={style.iconConnexion}><Icon_connexion /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
					>
						<MenuItem primaryText="Se connecter" onClick={this.handleConnexionClick}/>
						<MenuItem primaryText="S'inscrire" onClick={this.handleInscriptionClick}/>
					</IconMenu>
			
          </AppBar>
          <Drawer
          	docked={false}
          	width={200}
          	open={this.state.open}
          	onRequestChange={(open) => this.setState({open})}>
          
          	<AppBar title="AppBar" onLeftIconButtonClick={this.handleChangeDrawer}/>
      		
          	<MenuItem
                primaryText={"Film"}
                onClick={this.handleChangeFilm}
              />
              <MenuItem
                primaryText={"Musique"}
          		onClick={this.handleChangeMusique}
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
  }};

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
