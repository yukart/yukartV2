import Banner from '../Banner';
import MainView from '../MainView';
import React from 'react';
import { connect } from 'react-redux';

import SearchAppBar from '../SearchAppBar';
import Paper from 'material-ui/Paper';

class MusiqueView extends React.Component {
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
  			<Paper zDepth={5}>
  				<Banner appName={this.props.appName}/>
  		        <div className="container page">
  		          <div className="row">
  		            <p> Liste de musique : </p>
  		          </div>
  		        </div>
  		     </Paper>

  	   
  );
  }
}
const mapStateToProps = state => ({
  appName: state.common.appName,
});

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(MusiqueView);
