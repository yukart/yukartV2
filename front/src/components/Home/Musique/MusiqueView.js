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
              <div>
              <TextField
                    id="text-field-controlled"
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                <RaisedButton label="Search" primary={true} onClick={this.handleButton}/>
                </div>
              <div className="row">
                {this.props.artist !== null && this.props.artist.length !== 0 &&
                  <h1> Your research : </h1>
                }

                {this.props.artist !== null && this.props.artist.length !== 0 &&
                  this.props.artist.map((artist) => 
                    <Paper style={style.paper} zDepth={2}>
                      <img alt="poster" width="25%" src={artist.images}/>
                      <ul>
                        <li style={style.puce}>Name : {artist.name} </li>
                        <li style={style.puce}>Genres : {artist.genres} </li>
                      </ul>
                    </Paper>
                  )
                }
                {this.props.artist !== null && this.props.artist === "" &&
                  <Paper style={style} zDepth={2}>
                    <p> Artist not found : error 404 !!! </p>
                  </Paper>
                }
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
