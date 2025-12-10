import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { MdOutlineAlternateEmail } from "react-icons/md";

export const FormItemEmailInput: React.FC<IFormItem> = ({
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

  const name = 'email';
  const label = 'Email';

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
        },
        {
          type: 'email',
          message: t('invalidEmailForm'),
        },
      ]}
    >
      <Input
        allowClear
        size={size}
        autoComplete="off"
        disabled={disabled}
        style={{ width: '100%' }}
        placeholder={`Input ${label as string}`}
        addonAfter={iconPosition === 'end' ? <MdOutlineAlternateEmail /> : addonAfter}
        addonBefore={iconPosition === 'start' ? <MdOutlineAlternateEmail /> : addonBefore}
      />
    </Form.Item>
  );
};