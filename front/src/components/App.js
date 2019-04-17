import React from 'react';
import { connect } from 'react-redux';
import FilmView from './Home/Film/FilmView.js';
import MusiqueView from './Home/Musique/MusiqueView.js';
import TrackView from './Home/Musique/TrackView.js';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Banner from './Home/Banner';
import FlatButton from 'material-ui/FlatButton';

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
	  this.setState({show: "home"});
  }
  handleChangeMusique = () => {
	  this.setState({show: "musique"});
	  this.handleChangeDrawer();
  }
  handleChangeTrack = () => {
    this.setState({show: "track"});
    this.handleChangeDrawer();
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
    else if (this.state.show === "track"){
      return (
        <TrackView />
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
          >      
          
          <FlatButton label="Home" onClick={this.handleChangeHome} />

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
            <MenuItem
                primaryText={"Track"}
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
  }};

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
