import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import searchFilmByTitle from '../../../actions/searchFilmByTitle.js';
import Banner from '../Banner';

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
	  this.props.updateListFilms(this.state.value);
	  
	  this.setState({
	  	  value: ""
	   });
  };

  
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
	    			    	{this.props.film !== null && this.props.film !== "" &&
		    					<Paper style={style.paper} zDepth={2}>
			    					<p> Your research </p>
			    					<ul>
			    						<li style={style.puce}>Title : {this.props.film.title} </li>
			    						<li style={style.puce}>Year : {this.props.film.year} </li>
			    						<li style={style.puce}>Release date : {this.props.film.release_date} </li>
			    						<li style={style.puce}>Runtime : {this.props.film.runtime} </li>
			    						<li style={style.puce}>Genre : {this.props.film.genre} </li>
			    						<li style={style.puce}>Synopsis : {this.props.film.synopsis} </li>

			    					</ul>
			    				</Paper>
	    			    	}
	    			    	{this.props.film !== null && this.props.film === "" &&
		    					<Paper style={style} zDepth={2}>
			    					<p> Movie not found : error 404 !!! </p>
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
  films: state.common.films,
  film: state.common.film
});

const mapDispatchToProps = dispatch => ({
	updateListFilms: (name) => dispatch(searchFilmByTitle(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmView);
