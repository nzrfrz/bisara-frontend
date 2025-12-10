import {
  Button,
  InputNumber,
  Space,
  type FormInstance
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
interface ICombineNumberControl extends IFormItem {
  min?: number,
  max?: number,
  formName?: string,
  fieldValue?: number,
  formInstance?: FormInstance
}

export const CombineNumberControl: React.FC<ICombineNumberControl> = ({
  min,
  max,
  formName,
  disabled,
  fieldValue,
  formInstance,
  size = 'middle',
}) => {
  function handleIncrement() {
    if (max !== undefined && fieldValue as number < max) {
      return formInstance?.setFieldValue(formName, formInstance?.getFieldValue(formName) + 1);
    }

    if (max !== undefined && fieldValue === max) return;

    formInstance?.setFieldValue(formName, formInstance?.getFieldValue(formName) + 1);
  };

  function handleDecrement() {
    if (min !== undefined && fieldValue as number > min) {
      return formInstance?.setFieldValue(formName, formInstance?.getFieldValue(formName) - 1);
    }

    if (min !== undefined && fieldValue === min) return;

    formInstance?.setFieldValue(formName, formInstance?.getFieldValue(formName) - 1);
  };

  function onChange(value: number) {
    formInstance?.setFieldValue(formName, value);
  }; 

  return (
    <Space.Compact
      block
      size={size}
    >
      <InputNumber
        min={min}
        max={max}
        controls={false}
        value={fieldValue}
        disabled={disabled}
        onChange={(value) => onChange(value as number)}
      />
      <Button
        disabled={disabled}
        icon={<MinusOutlined />}
        onClick={handleDecrement}
      />
      <Button
        disabled={disabled}
        icon={<PlusOutlined />}
        onClick={handleIncrement}
      />
    </Space.Compact>
  );
};