import { Form, TreeSelect } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useTranslation } from 'react-i18next';

interface ITreeData extends DataNode {
  value?: string | number | undefined;
  title?: string | number | undefined;
  children?: ITreeData[]
}

interface IFormItemSelect extends IFormItem {
  treeData: ITreeData[] | any | undefined,
  multiple?: boolean,
}

export const FormItemTreeSelect: React.FC<IFormItemSelect> = ({
  name,
  label, 
  helper,
  treeData,
  disabled,
  fieldStatus,
  size = 'middle',
  multiple = false,
  isMandatory = true,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name={name}
      help={helper}
      label={label}
      validateStatus={fieldStatus}
      rules={[
        {
          required: isMandatory,
          message: t('emptyFormField')
        }
      ]}
    >
      <TreeSelect
        showSearch
        allowClear
        size={size}
        multiple={multiple}
        treeData={treeData}
        disabled={disabled}
        placeholder={`Select ${label}`}
        treeCheckable={multiple === true ? true : false}
      />
    </Form.Item>
  );
};