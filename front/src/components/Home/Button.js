import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AddCircle from '@material-ui/icons/AddCircleOutline'

const Button = ({onButtonPressed, icon}) => (
  <button
    onClick={() => onButtonPressed()}
    className="default-button"
  >
    {icon === "check" &&
      <CheckCircle />
    }

    {icon === "plus" &&
      <AddCircle />
    }
  </button>
);

export default Button;
