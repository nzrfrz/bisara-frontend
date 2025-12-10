import { SliderMultiple } from './SliderMultiple';
import { SliderSingle } from './SliderSingle';

interface IFormItemSlider extends IFormItem {
  min?: number,
  max?: number,
  step?: number,
  range?: boolean,
  vertical?: boolean,
}

export const FormItemSlider: React.FC<IFormItemSlider> = ({
  min = 0,
  max = 100,
  step,
  name,
  label,
  helper,
  disabled,
  fieldStatus,
  range = false,
  vertical = false,
  isMandatory = true,
}) => {
  if (range === true) return (
    <SliderMultiple
      min={min}
      max={max}
      step={step}
      name={name}
      label={label}
      helper={helper}
      disabled={disabled}
      fieldStatus={fieldStatus}
      vertical={vertical}
      isMandatory={isMandatory}
    />
  );
  else return (
    <SliderSingle
      min={min}
      max={max}
      step={step}
      name={name}
      label={label}
      helper={helper}
      disabled={disabled}
      fieldStatus={fieldStatus}
      vertical={vertical}
      isMandatory={isMandatory}
    />
  )
}