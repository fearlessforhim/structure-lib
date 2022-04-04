import Button from './button/button.js';
import YesNoToggle from './yes-no-toggle/YesNoToggle.js';
import Tabs from './tabs/Tabs.js';
import SLInput from './inputs/SLInput.js';

window.React2 = require('react');
console.log(window.React1 === window.React2);
console.log(window.React1);
console.log(window.React2);

export {
  Button,
  YesNoToggle,
  Tabs,
  SLInput
};
