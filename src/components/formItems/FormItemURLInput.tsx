import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { TbWorldWww } from "react-icons/tb";

export const FormItemURLInput: React.FC<IFormItem> = ({
  name,
  label,
  helper,
  disabled,
  addonAfter,
  addonBefore,
  fieldStatus,
  size = "middle",
  noStyle = false,
  isMandatory = true,
  iconPosition = 'start',
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      label={label}
      help={helper}
      noStyle={noStyle}
      validateStatus={fieldStatus}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField'),
        },
        {
          type: 'url',
          message: t('invalidURLForm'),
        },
      ]}
    >
      <Input
        allowClear
        size={size}
        autoComplete="off"
        disabled={disabled}
        placeholder={`Input ${label}`}
        style={{ width: '100%' }}
        addonAfter={iconPosition === 'end' ? <TbWorldWww /> : addonAfter}
        addonBefore={iconPosition === 'start' ? <TbWorldWww /> : addonBefore}
      />
    </Form.Item>
  );
};