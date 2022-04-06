import React from 'react';

export default function SLTableRow(props) {

  let myWidth = 100/props.columns.length;

  return (
    <div
      className={`sl-table-row`}
      onClick={() => {
        if(props.onClick) {
          props.onClick(props.data, props.rowNum);
        }
      }}
    >
      {props.columns.map(c => {
        return (
          <div
            className={`sl-table-column-item ${props.tableId}-${props.rowNum}-${c.key}`}
            key={`${props.tableId}-${props.rowNum}-${c.key}`}
            style={{
              width: `${myWidth}%`
            }}
          >
            {props.data[c.key]}
          </div>
        )
      })}
    </div>
  )
}
