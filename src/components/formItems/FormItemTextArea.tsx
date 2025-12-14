import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const FormItemTextArea: React.FC<IFormItem> = ({
  name,
  label,
  helper,
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
      <Input.TextArea
        allowClear
        size={size}
        autoComplete="off"
        disabled={disabled}
        style={{ width: '100%' }}
        placeholder={`Input ${label as string}`}
      />
    </Form.Item>
  );
};