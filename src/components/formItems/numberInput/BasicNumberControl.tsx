import {
  InputNumber,
  type FormInstance,
} from "antd";

interface IBasicNumberControl extends IFormItem {
  min?: number,
  max?: number,
  formName?: string,
  fieldValue?: number,
  formInstance?: FormInstance
}

export const BasicNumberControl: React.FC<IBasicNumberControl> = ({
  min,
  max,
  formName,
  disabled,
  fieldValue,
  formInstance,
  size = 'middle',
}) => {
  function onChange(value: number) {
    formInstance?.setFieldValue(formName, value);
  };

  return (
    <InputNumber
      min={min}
      max={max}
      size={size}
      changeOnWheel
      controls={true}
      value={fieldValue}
      disabled={disabled}
      onChange={(value) => onChange(value as number)}
    />
  );
};