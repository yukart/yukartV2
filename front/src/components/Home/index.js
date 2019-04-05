import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import { connect } from 'react-redux';

import SearchAppBar from './SearchAppBar';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class Home extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
    		open: false,
	    };
	  }
  componentWillMount() {
   

  }

  componentWillUnmount() {

  }

  handleChangeDrawer = () => {
	  this.setState({open: !this.state.open});
  }
  
  render() {
    return (
     <div>HOME</div>

    );
  }
}
const mapStateToProps = state => ({
  appName: state.common.appName,
});

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
