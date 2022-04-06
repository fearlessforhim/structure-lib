import React, {useId} from 'react';
import './sl-input.scss';

export default function SLInput(props) {

  return (
    <div
      className={`sl-input-wrap`}
    >
    {props.label && <div className={'sl-input-label'}>{props.label}</div>}
    <div
      className={`sl-input-inner`}
    >
        <input
          value={props.value}
          onChange={(e) => {
              if(props.onChange){
                props.onChange(e.target.value);
              }
            }}
        />
        <div
          className={`sl-input-actions`}
        >
          {(props.actions || []).map(a => {
            return (
              <div
                key={useId()}
                title={a.title}
                className={`sl-input-action fa ${a.loading ? `loading fa-spinner` : a.icon} ${a.disabled || !a.onClick ? `disabled` : ``}`}
                onClick={a.disabled || a.loading ? null : a.onClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
