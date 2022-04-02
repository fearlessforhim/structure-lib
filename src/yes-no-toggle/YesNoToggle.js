import React from 'react';
import './yes-no-toggle.scss'

export default function YesNoToggle(props) {

  return (
    <div className={`yes-no-toggle-wrap ${props.disabled ? `disabled` : ``}`}>
      <div
        className={`selection-indicator-wrap`}
      >
          <div
            className={`selection-indicator ${props.value ? `on` : `off`}`}
          />
      </div>
      <div
        className={`options-wrap`}
      >
        <div
          className={`toggle-option toggle-off`}
          onClick={() => {
              if(!props.disabled && props.onChange){
                props.onChange(false);
              }
            }
          }
        >
          {props.offIcon && <span className={`fa ${props.offIcon}`}/>}
          {props.offText && <span className={`toggle-text`}>{props.offText}</span>}
        </div>
        <div
          className={`toggle-option toggle-on`}
          onClick={() => {
              if(!props.disabled && props.onChange){
                props.onChange(true);
              }
            }
          }
        >
          {props.onIcon && <span className={`fa ${props.onIcon}`}/>}
          {props.onText && <span className={`toggle-text`}>{props.onText}</span>}
        </div>
      </div>

    </div>
  );
}
