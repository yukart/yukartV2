import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import verificationCode from '../../actions/verificationCode.js'
import connexion from '../../actions/connexion.js'

class InscriptionConfirmation extends React.Component {
constructor(props){
  super(props);
  this.state={
    code: "",
  };
 }

handleClick = () => {
  this.props.verification(this.props.username,this.state.code).then(response => {
    if (this.props.verificationTest) {
      this.props.connexion(this.props.username,this.props.password).then(response => {
        this.props.handleChangeConnexion(this.props.username,this.props.password);
      });
    } 
    else {
      alert("The code is incorrect !");
    }
    this.setState({code: ""});
  });
}

render() {
    return (
      <div>
        <MuiThemeProvider>
          <div style={{position: 'absolute', top: '50%',left: '50%', transform: 'translate(-50%, -50%)', boxSizing: 'border-box', padding: '0', margin: '0'}}>
            <h1 style={{textAlign: 'center'}}> Account confirmation </h1>
            <p>{this.props.username}</p>

           <TextField
             hintText="Enter the verification code"
             floatingLabelText="PIN"
             floatingLabelFocusStyle={{color: '#f16e00'}}
             onChange = {(event,newValue) => this.setState({code:newValue})}
            />
            <br/>

            <RaisedButton label="Verify" backgroundColor={'#f16e00'} style={{display: 'flex', justifyContent: 'center'}} onClick={() => this.handleClick()}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  verificationTest: state.common.verificationTest,
});

const mapDispatchToProps = dispatch => ({
  verification: (username,code) => dispatch(verificationCode(username,code)),
  connexion: (login,pass) => dispatch(connexion(login,pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionConfirmation);