import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const FormItemBasicInput: React.FC<IFormItem> = ({
  name,
  label,
  helper,
  addonAfter,
  addonBefore,
  fieldStatus,
  size = "middle",
  noStyle = false,
  disabled = false,
  isMandatory = true,
}) => {
  const { t } = useTranslation();  

  return (
    <Form.Item
      name={name}
      help={helper}
      label={label}
      noStyle={noStyle}
      required={isMandatory}
      validateStatus={fieldStatus}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField')
        }
      ]}
    >
      <Input
        allowClear
        size={size}
        autoComplete="off"
        disabled={disabled}
        addonAfter={addonAfter}
        style={{ width: '100%' }}
        addonBefore={addonBefore}
        placeholder={`Input ${label as string}`}
      />
    </Form.Item>
  );
};