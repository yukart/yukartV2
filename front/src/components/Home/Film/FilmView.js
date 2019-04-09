import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import searchFilmByTitle from '../../../actions/searchFilmByTitle.js';
import Banner from '../Banner';

const style = {
	paper: {
		width: '900px',
		margin: 20,
		textAlign: 'center',
		display: 'block',
	},
	puce: {
		listStyleType: 'none'
	},
	image: {
		width: '300px',
		height: '445px'
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
				<Banner appName={this.props.appName} />
				<div className="container page">
					<div>
						<TextField
							id="text-field-controlled"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<RaisedButton label="Search" primary={true} onClick={this.handleButton} />
					</div>

					{this.props.film !== null && this.props.film.length !== 0 &&
						<h1> Your research : </h1>
					}
					<Paper style={style.paper}>

						{this.props.film !== null && this.props.film.length !== 0 &&
							this.props.film.map((film) =>
								<img alt="poster" style={style.image} src={film.poster_url} />
							)
						}
					</Paper>
					{/*	<ul>
										<li style={style.puce}>Title : {film.title} </li>
										<li style={style.puce}>Year : {film.year} </li>
										<li style={style.puce}>Release date : {film.release_date} </li>
										<li style={style.puce}>Runtime : {film.runtime} </li>
										<li style={style.puce}>Genre : {film.genre} </li>
										<li style={style.puce}>Synopsis : {film.synopsis} </li>
									</ul> 
								*/}
					{this.props.film !== null && this.props.film === "" &&
						<Paper style={style} zDepth={2}>
							<p> Movie not found : error 404 !!! </p>
						</Paper>
					}
				</div>
			</Paper>


		);
	}
}
const mapStateToProps = state => ({
	appName: state.common.appName,
	film: state.common.film
});

const mapDispatchToProps = dispatch => ({
	updateListFilms: (name) => dispatch(searchFilmByTitle(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmView);
