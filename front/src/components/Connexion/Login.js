import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import connexion from '../../actions/connexion.js'

const style = {
  margin: 15,
 };

class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
  username:"",
  password:"",
  };
 }

handleClick = () => {
  this.props.connexion(this.state.username,this.state.password).then(response => {
    if(this.props.connexionTest) {
      alert("Vous êtes connectés !");
    } else {
      alert("Wrong login / password !");
    }
  });
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h1> Login </h1>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={() => this.handleClick()}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    appName: state.common.appName,
    connexionTest: state.common.connexion
  });

const mapDispatchToProps = dispatch => ({
  connexion: (login,pass) => dispatch(connexion(login,pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);