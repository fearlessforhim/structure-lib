import React, {useState, useImperativeHandle, forwardRef, useRef, useId} from 'react';
import './sl-table.scss';
import SLTableRow from './SLTableRow.js';
import TableUtil from './table-utils.js'

export default forwardRef(function SLTable(props, ref) {

  const allowSort = props.allowSort === undefined || props.allowSort || false;
  let myColumnWidth = 100/props.columns.length;
  let [tableId] = useState(useId());
  let [sortKey, setSortKey] = useState(props.sortKey || {});

  const dataCopy = props
    .data
    .map(d => {
      return {
        data: d.data || {},
        options: d.options || {}
      };
    });

  if(allowSort) {
    new TableUtil(sortKey).sort(dataCopy);
  }

  return (
    <div
      className={`sl-table-parent ${tableId}`}
    >
      <div
        className={`sl-table-header`}
      >
        {props.columns.map(c => {
          return (
            <div
              key={c.key}
              className={`sl-table-header-item`}
              style={{
                width: `${myColumnWidth}%`
              }}
              onClick={() => {
                let newDirection = ``;
                if(sortKey.direction === `` || sortKey.direction === undefined){
                  newDirection = `ASC`;
                } else if (sortKey.direction === `ASC`){
                  newDirection = `DES`;
                }

                setSortKey({
                  column: newDirection ? c.key : ``,
                  direction: newDirection
                });
              }}
            >
              <div
                className={`sl-table-header-item-text`}
              >
                {c.headerText}
              </div>
              {c.key === sortKey.column &&
                <div className={`sorted fa ${sortKey.direction === `ASC` ? `fa-chevron-up` : (sortKey.direction === `DES` ? `fa-chevron-down` : ``)}`}/>
              }
            </div>
          )
        })}
      </div>
      <div
        className={`sl-table-body ${props.withSummaryRow ? 'with-summary' : ''}`}
      >
          {dataCopy
            .map((d,idx) => {
            return <SLTableRow
              key={`${tableId}-${idx}`}
              rowNum={idx}
              tableId={tableId}
              columns={props.columns}
              data={d.data}
              onClick={d.options.onClick}
            />
          })}
      </div>
      {props.withSummaryRow &&
        <div
          className={'summary-row'}
        >
          {props.columns.map(c => {

            const summaryRenderer = c.summaryRenderer;

            return (
              <div
                key={`summary-row-item-${c.key}`}
                className={'summary-row-item'}
                style={{
                  width: `${myColumnWidth}%`
                }}
              >
                {!summaryRenderer ? '' : (typeof summaryRenderer === 'function'? summaryRenderer(dataCopy, c) : summaryRenderer)}
              </div>
            )
          })}
        </div>
      }
    </div>
  )

});
