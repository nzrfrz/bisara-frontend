import { Form, Select } from 'antd';
import type { SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';

interface IFormItemSelectSearch extends IFormItem {
  selectOptions?: SelectProps['options'],
  selectMode?: TSelectSearchFormMode,
}

export const FormItemSelectSearch: React.FC<IFormItemSelectSearch> = ({
  name,
  label, 
  helper,
  disabled,
  fieldStatus,
  selectOptions,
  size = 'middle',
  isMandatory = true,
  selectMode = 'single',
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      label={label}
      help={helper}
      validateStatus={fieldStatus}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField')
        }
      ]}
    >
      <Select
        showSearch
        allowClear
        size={size}
        disabled={disabled}
        optionFilterProp="value"
        options={selectOptions}
        placeholder={`Select ${label}`}
        mode={selectMode === 'single' ? undefined : selectMode}
      />
    </Form.Item>
  );
};