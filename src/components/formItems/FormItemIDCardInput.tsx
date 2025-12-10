import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { FaIdCard } from "react-icons/fa6";

export const FormItemIDCardInput: React.FC<IFormItem> = ({
  helper,
  noStyle,
  disabled,
  addonAfter,
  addonBefore,
  isMandatory,
  fieldStatus,
  size = "middle",
  iconPosition = 'start',
}) => {
  const { t } = useTranslation();

  const name = 'idCardNumber';
  const label = 'ID Card Number';
  const minChars = 16;
  const maxChars = 16;

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
          message: t('emptyFormField'),
        },
        {
          pattern: /^[0-9]*$/,
          message: t('idCardForm.invalidInput'),
        },
        {
          min: minChars,
          max: maxChars,
          message: t('idCardForm.invalidLengthInput', { maxChars }),
        },
      ]}
    >
      <Input
        allowClear
        size={size}
        autoComplete="off"
        disabled={disabled}
        placeholder={`Input ${label as string}`}
        style={{ width: '100%' }}
        addonAfter={iconPosition === 'end' ? <FaIdCard /> : addonAfter}
        addonBefore={iconPosition === 'start' ? <FaIdCard /> : addonBefore}
      />
    </Form.Item>
  );
};