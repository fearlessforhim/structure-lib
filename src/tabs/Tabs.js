import React, {useState} from 'react';
import './tabs.scss'

export default function Tabs(props) {

  let [selectedTabKey, setSelectedTabKey] = useState(props.tabs[0].key);

  return (
    <div className={'structure-lib-tabs-wrap'}>
      <div
        className={`structure-lib-tabs-header-wrap`}
      >
        {props.tabs.map(t => {
          return (
            <div
              key={t.key}
              className={`tab-item`}
            >
              {t.title}
            </div>
          )
        })}
      </div>
      <div
        className={`structure-lib-tabs-content-wrap`}
      >
        {props.tabs.filter(t => t.key === selectedTabKey)[0].component}
      </div>
    </div>
  );
}
