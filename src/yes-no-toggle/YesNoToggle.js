import React, {useState} from 'react';
import './yes-no-toggle.scss'

export default function YesNoToggle(props) {

  let [value, setValue] = useState(props.value || false);

  return (
    <div className={'yes-no-toggle-wrap'}>
      <div
        className={`toggle-off-option ${props.offIcon ? `fa fa-${props.offIcon}` : ``}`}
      >
        {props.offText}
      </div>
      <div
        className={`toggle-on-option ${props.onIcon ? `fa fa-${props.onIcon}` : ``}`}
      >
        {props.onText}
      </div>
      <div
        className={`selection-indicator ${value ? `on` : `off`}`}
      >
      </div>
    </div>
  );
}
