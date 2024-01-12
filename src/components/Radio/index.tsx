import InternalRadio from './Radio';
import RadioGroup from './Group';

type RadioType = typeof InternalRadio & {
  Group: typeof RadioGroup;
};

const Radio = InternalRadio as RadioType;

Radio.Group = RadioGroup;

export default Radio;
