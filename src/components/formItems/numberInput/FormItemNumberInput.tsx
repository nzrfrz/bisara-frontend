import {
  useEffect,
  useMemo
} from "react";
import { Form } from "antd";
import { CombineNumberControl } from "./CombineNumberControl";
import { SeperateNumberControl } from "./SeperateNumberControl";
import { BasicNumberControl } from "./BasicNumberControl";

// type TControlType = 'basic' | 'seperate' | 'combine';

interface IFormItemNumberInput extends IFormItem {
  minimumNumberAllowed?: number,
  maximumNumberAllowed?: number,
  controlType?: TNumberFormControlType,
}

export const FormItemNumberInput: React.FC<IFormItemNumberInput> = ({
  name,
  label,
  helper,
  disabled,
  fieldStatus,
  size = "middle",
  minimumNumberAllowed,
  maximumNumberAllowed,
  controlType = 'basic',
}) => {
  const formInstance = Form.useFormInstance();
  const formUseWatch = Form.useWatch(name, formInstance);

  const renderNumberInput = useMemo(() => {
    switch (controlType) {
      case 'combine':
        return (
          <CombineNumberControl
            size={size}
            disabled={disabled}
            formName={name as string}
            fieldValue={formUseWatch}
            min={minimumNumberAllowed}
            max={maximumNumberAllowed}
            formInstance={formInstance}
          />
        );
      case 'seperate':
        return (
          <SeperateNumberControl
            size={size}
            disabled={disabled}
            formName={name as string}
            fieldValue={formUseWatch}
            min={minimumNumberAllowed}
            max={maximumNumberAllowed}
            formInstance={formInstance}
          />
        );
      default:
        return (
          <BasicNumberControl
            size={size}
            disabled={disabled}
            formName={name as string}
            fieldValue={formUseWatch}
            min={minimumNumberAllowed}
            max={maximumNumberAllowed}
            formInstance={formInstance}
          />
        );
    }
  }, [controlType, size, disabled, name, formUseWatch, minimumNumberAllowed, maximumNumberAllowed, formInstance]);

  useEffect(() => {
    if ((formUseWatch === null || formUseWatch === undefined) && minimumNumberAllowed === undefined) return formInstance.setFieldValue(name, 0);
    if ((formUseWatch === null || formUseWatch === undefined) && minimumNumberAllowed !== undefined) return formInstance.setFieldValue(name, minimumNumberAllowed);
  }, [formInstance, formUseWatch, minimumNumberAllowed]);

  return (
    <Form.Item
      name={name}
      label={label}
      help={helper}
      required={false}
      validateStatus={fieldStatus}
    >
      {renderNumberInput}
    </Form.Item>
  );
};