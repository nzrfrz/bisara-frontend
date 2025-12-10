import {
  useMemo,
} from 'react';
import {
  Form,
  Slider,
  type SliderSingleProps
} from 'antd';
import { useTranslation } from 'react-i18next';

interface ISliderSingle extends IFormItem {
  min?: number,
  max?: number,
  step?: number,
  vertical?: boolean,
};

export const SliderSingle: React.FC<ISliderSingle> = ({
  min = 0,
  max = 150,
  step,
  name,
  label,
  helper,
  disabled,
  fieldStatus,
  vertical = false,
  isMandatory = true,
}) => {
  const { t } = useTranslation();
  // const formInstance = Form.useFormInstance();

  const setInitValue = useMemo(() => {
    return Math.round(min + (max * (1 / 5)));
  }, [min, max]);

  const setMarks: SliderSingleProps['marks'] = useMemo(() => {
    const midRange = max / 2;
    return {
      [min]: `${min}`,
      [midRange]: `${midRange}`,
      [max]: `${max}`,
    };
  }, [min, max]);

  const setSliderStyles = useMemo(() => {
    const maxInString = max.toString();
    if (maxInString.length >= 5 && vertical === false) return { margin: '0 24px' };
    if (vertical === true) return { height: 300, marginTop: 16 }
  }, [max, vertical]);

  return (
    <Form.Item
      name={name}
      help={helper}
      label={label}
      initialValue={setInitValue}
      validateStatus={fieldStatus}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField')
        }
      ]}
    >
      <Slider
        min={min}
        max={max}
        step={step}
        marks={setMarks}
        vertical={vertical}
        disabled={disabled}
        style={setSliderStyles}
      />
    </Form.Item>
  );
};