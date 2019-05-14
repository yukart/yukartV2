import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import connexion from '../../actions/connexion.js'

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
      this.props.handleChangeHome();
    } else {
      alert("Wrong login / password !");
    }
  });
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-50%, -50%)', boxSizing: 'border-box', padding: '0', margin: '0'}}>
            <h1 style={{textAlign: 'center'}}> Login </h1>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             floatingLabelFocusStyle={{color: '#f16e00'}}
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelFocusStyle={{color: '#f16e00'}}
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" backgroundColor={'#f16e00'} style={{display: 'flex', justifyContent: 'center'}} onClick={() => this.handleClick()}/>
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