import React, {useState, forwardRef, useRef, useImperativeHandle} from 'react';
import PopOut from '../pop-out/PopOut.js';
import './wizard.scss';

export default forwardRef(function Wizard(props, ref) {

  const modalRef = useRef(null);
  let stepRef = useRef(null);
  let [wizardData, setWizardData] = useState({});
  let [activeStepIdx, setActiveStepIdx] = useState(0);
  let [validationErrorMessage, setValidationErrorMessage] = useState('');
  let [wizardLoading, setWizardLoading] = useState(false);

  useImperativeHandle(ref,
    () => ({
      open() {
        setWizardData({});
        setActiveStepIdx(0);
        modalRef.current.open();
      },
      close() {
        modalRef.current.close();
      }
    }), []);

    let validateStep = async () => {
      if (stepRef.current.getValidationErrors) {
        return await stepRef.current.getValidationErrors();
      }
      return [];
    }

  let goForwardStep = async () => {
    setWizardLoading(true);
    const validationErrors = await validateStep();
    if(validationErrors.length > 0) {
      setValidationErrorMessage(validationErrors[0]);
      setWizardLoading(false);
      return;
    }
    setValidationErrorMessage('');
    setWizardData(Object.assign(wizardData, stepRef.current.getStepData()))
    setActiveStepIdx(activeStepIdx + 1);
    setWizardLoading(false);
  }

  let goBackStep = () => {
    setWizardData(Object.assign(wizardData, stepRef.current.getStepData()))
    setActiveStepIdx(activeStepIdx - 1);
  }

  let finishWizard = async () => {
    setWizardLoading(true);
    const validationErrors = await validateStep();
    if(validationErrors.length > 0) {
      setValidationErrorMessage(validationErrors[0]);
      setWizardLoading(false);
      return;
    }
    await props.onComplete(Object.assign(wizardData, stepRef.current.getStepData()));
    setWizardLoading(false);
  }

  let wizardActions = [
    {
      text: 'Previous',
      onClick: goBackStep,
      disabled: activeStepIdx === 0,
      loading: wizardLoading
    }
  ];

  if(activeStepIdx === props.steps.length - 1) {
    wizardActions.push({
        text: 'Finish',
        onClick: finishWizard,
        loading: wizardLoading
      });
  } else {
    wizardActions.push({
        text: 'Next',
        onClick: goForwardStep,
        loading: wizardLoading
      });
  }

  const hasValidationError = !!validationErrorMessage;
  const activeStep = props.steps[activeStepIdx];

  return (
    <PopOut
      title={`${props.title}${activeStep.title ? ` : ${activeStep.title}` : ``}`}
      className={`wizard-modal ${props.className}`}
      ref={modalRef}
      startOpen
      showClose={props.showClose}
      actions={wizardActions}
      onClose={() => {
        setWizardData({});
        setActiveStepIdx(0);
      }}
    >
     {React.createElement(activeStep.component, {ref: stepRef, globalData: wizardData})}
     <div
      className={`validation-error ${hasValidationError ? 'error' : ''}`}
     >
      {validationErrorMessage}
      <span className='error-close-icon fa fa-times-circle'
        onClick={() => {
          setValidationErrorMessage(null);
        }}
      />
     </div>
    </PopOut>
  )
});
