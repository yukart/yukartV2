import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

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
      loading: false
    };
  }

  handleClick = () => {
    this.setState({
      loading: true
    });
    
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
          <div style={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-50%, -50%)', boxSizing: 'border-box', padding: '0', margin: '0'}}>
          <h1 style={{textAlign: 'center'}}>Register</h1>
           <TextField
             hintText="Enter your username"
             floatingLabelFocusStyle={{color: '#f16e00'}}
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             floatingLabelFocusStyle={{color: '#f16e00'}}
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelFocusStyle={{color: '#f16e00'}}
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" backgroundColor={'#f16e00'} style={{display: 'flex', justifyContent: 'center'}} onClick={() => this.handleClick()}/>
            {this.state.loading &&
                  <CircularProgress size={60} thickness={7} color={'#f16e00'}/>
            }
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