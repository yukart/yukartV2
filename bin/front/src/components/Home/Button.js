import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AddCircle from '@material-ui/icons/AddCircleOutline'

class Button extends React.Component {
  render() {
    return (
      <button
      onClick={() => this.props.onButtonPressed()}
      className="default-button"
      >
        {this.props.icon === "check" &&
          <CheckCircle />
        }
    
        {this.props.icon === "plus" &&
          <AddCircle />
        }
      </button>     
    );
  }

}

export default Button;
