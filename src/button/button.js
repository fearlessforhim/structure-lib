import React from 'react';
import './button.scss'

export default function Button(props) {

  return (
    <div
     className={`
       structure-lib-button-wrap
      ${props.fullWidth ? `full-width` : ``}
      ${props.loading ? `loading` : ``}
      ${props.disabled ? `disabled` : ``}
      `}
     onClick={() => {
         if(props.onClick){
           props.onClick();
         }
       }
     }
    >
      <div
        className={`button-flex`}
      >
        {props.icon &&
          <div
            className={`button-icon fa ${props.icon}`}
          />
        }
        {props.loading &&
          <div
          className={`loading-spinner fa fa-spinner`}
          />
        }
        <div
          className={`button-text`}
        >
          {props.text || `Click Me!`}
        </div>
      </div>
    </div>
);
}
