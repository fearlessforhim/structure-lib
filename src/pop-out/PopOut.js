import React, {useState, forwardRef, useImperativeHandle, useId} from 'react';
import './pop-out.scss';

export default forwardRef(function PopOut(props, ref) {

  let [isOpen, setOpened] = useState(props.startOpen || false);

  useImperativeHandle(ref, () => ({
    open() {
      setOpened(true);
    },
    close() {
      setOpened(false);
    }
  }), []);

  return (
    <div
      className={`pop-out-parent ${isOpen ? `open` : ``}`}
    >
      <div
        className={`pop-out-wrap`}
      >
        <div
          className={`pop-out-header`}
        >
          <div
            className={`pop-out-title`}
          >
            {props.title || `[Needs a Title]`}
          </div>
          <div
            className={`pop-out-header-actions`}
          >
            {props.showClose &&
              <div
                className={`pop-out-header-action fa fa-times`}
                onClick={() => {
                  setOpened(false);
                  if(props.onClose) {
                    props.onClose();
                  }
                }}
              />
            }
          </div>
        </div>
        <div
          className={`pop-out-content ${props.withPad ? `with-pad` : ``}`}
        >
        {props.children || `[No Content]`}
        </div>
        {props.actions && props.actions.length > 0 &&
          <div
            className={`pop-out-actions`}
          >
            {props.actions.map(a => {
              return (
                <div
                  key={useId()}
                  className={`pop-out-action ${a.disabled ? `disabled` : ``} ${a.loading ? `loading` : ``}`}
                  onClick={() => {
                    if(a.onClick && !a.loading && !a.disabled){
                      a.onClick();
                    }
                  }}
                >
                {a.loading &&
                  <div
                    className={`loading-spinner fa fa-spinner`}
                  />
                }
                  <div
                    className={`action-text`}
                  >
                    {a.text}
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
});
