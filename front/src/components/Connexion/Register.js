import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import inscription from '../../actions/inscription.js';

const style = {
  margin: 15,
};

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password:"",
      email:"",
    };
  }

  handleClick = () => {
    this.props.inscription(this.state.username,this.state.password, this.state.email).then(response => {
      switch (this.props.inscriptionTest) {
        case "USER_ALREADY_EXISTS":
          alert("Username already exists or wrong password");
          break;
        case "NEW_USER_CREATED":
          alert("Inscription is done. You should have received an email confirming your inscription !");
          this.props.handleChangeHome();
          break;
        default:

      }
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <h1>Register</h1>
           <TextField
             hintText="Enter your username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
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
  inscriptionTest: state.common.inscription
});

const mapDispatchToProps = dispatch => ({
  inscription: (login,pass, mail) => dispatch(inscription(login,pass,mail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);