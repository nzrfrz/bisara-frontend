import { 
  Form, 
  Radio, 
  type CheckboxOptionType,
} from "antd";
import type { RadioGroupOptionType } from "antd/es/radio";
import { useTranslation } from "react-i18next";

interface IFormItemRadio extends IFormItem {
  radioType?: RadioGroupOptionType | undefined,
  selectionData: CheckboxOptionType<string>[],
}

export const FormItemRadio: React.FC<IFormItemRadio> = ({
  name,
  label,
  helper,
  disabled,
  selectionData,
  isMandatory = true,
  radioType = 'default',
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      label={label}
      help={helper}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField')
        }
      ]}
    >
      <Radio.Group
        disabled={disabled}
        optionType={radioType}
        options={selectionData}
        block={radioType === 'button' ? true : false}
      />
    </Form.Item>
  );
};