import React, {useState} from 'react';
import './tabs.scss'

export default function Tabs(props) {

  let [selectedTabKey, setSelectedTabKey] = useState(props.selectedTabKey || props.tabs[0].key);

  let selectedTab = props.tabs.filter(t => t.key === selectedTabKey)[0];

  return (
    <div className={'structure-lib-tabs-wrap'}>
      <div
        className={`structure-lib-tabs-header-wrap`}
      >
        {props.tabs.map(t => {
          return (
            <div
              key={t.key}
              className={`tab-item ${t.key === selectedTabKey ? `selected` : ``}`}
              onClick={() => {setSelectedTabKey(t.key)}}
            >
              {t.title}
            </div>
          )
        })}
      </div>
      <div
        className={`structure-lib-tabs-content-wrap`}
      >
        {React.createElement(selectedTab.component, selectedTab.props)}
      </div>
    </div>
  );
}
