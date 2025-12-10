import {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  Card,
  Checkbox,
  Divider,
  Form,
  Radio,
  Tabs,
  type CheckboxProps,
  type TabsProps
} from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemSubmitButton, FormItemTreeSelect, FormItemWrapper } from "../../../components";
import { TreeSelectInputPropertiesTable } from "./TreeSelectInputPropertiesTable";
import { TreeSelectDataPropertiesTable } from "./TreeSelectDataPropertiesTable";
import { TreeSelectInputCodeSnippet } from "./TreeSelectInputCodeSnippet";

const treeData = [
  {
    key: 'engineering',
    value: 'engineering',
    title: 'Engineering Department',
    children: [
      {
        key: 'frontend',
        value: 'frontend',
        title: 'Frontend Team',
        disableCheckbox: true,
        children: [
          {
            key: 'fe-lead',
            value: 'fe-lead',
            title: <b style={{ color: '#2a9d8f' }}>Frontend Team Lead</b>,
          },
          {
            key: 'fe-senior',
            value: 'fe-senior',
            title: 'Senior Frontend Developer',
          },
          {
            key: 'fe-junior',
            value: 'fe-junior',
            title: 'Junior Frontend Developer',
          },
        ],
      },
      {
        key: 'backend',
        value: 'backend',
        title: 'Backend Team',
        checkable: true,
        children: [
          {
            key: 'be-lead',
            value: 'be-lead',
            title: <b style={{ color: '#2a9d8f' }}>Backend Team Lead</b>,
          },
          {
            key: 'be-senior',
            value: 'be-senior',
            title: 'Senior Backend Developer',
          },
          {
            key: 'be-junior',
            value: 'be-junior',
            title: 'Junior Backend Developer',
          },
          {
            key: 'be-devops',
            value: 'be-devops',
            title: 'DevOps Engineer',
          },
        ],
      },
    ],
  },
  {
    key: 'marketing',
    value: 'marketing',
    title: 'Marketing Department',
    children: [
      {
        key: 'digital',
        value: 'digital',
        title: 'Digital Marketing Team',
        selectable: false,
        children: [
          {
            key: 'dm-manager',
            value: 'dm-manager',
            title: <b style={{ color: '#e76f51' }}>Digital Marketing Manager</b>,
          },
          {
            key: 'dm-seo',
            value: 'dm-seo',
            title: 'SEO Specialist',
          },
          {
            key: 'dm-content',
            value: 'dm-content',
            title: 'Content Creator',
          },
        ],
      },
      {
        key: 'branding',
        value: 'branding',
        title: 'Branding Team',
        selectable: false,
        children: [
          {
            key: 'br-manager',
            value: 'br-manager',
            title: <b style={{ color: '#e76f51' }}>Branding Manager</b>,
          },
          {
            key: 'br-designer',
            value: 'br-designer',
            title: 'Graphic Designer',
          },
        ],
      },
    ],
  },
  {
    key: 'hr',
    value: 'hr',
    title: 'Human Resources',
    children: [
      {
        key: 'hr-recruitment',
        value: 'hr-recruitment',
        title: 'Recruitment Team',
        children: [
          {
            key: 'hr-lead',
            value: 'hr-lead',
            title: <b style={{ color: '#264653' }}>HR Lead</b>,
          },
          {
            key: 'hr-recruiter',
            value: 'hr-recruiter',
            title: 'Recruiter',
          },
        ],
      },
    ],
  },
];

export const DemoTreeSelectForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('department', form);  

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeMultiple: CheckboxProps['onChange'] = (e) => {
    setIsMultiple(e.target.checked);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeIsMandatory: CheckboxProps['onChange'] = (e) => {
    setIsMandatory(e.target.checked);
    form.resetFields();
    setValue(undefined);
  };

  const onFinishForm = (values: Record<string, unknown>) => {
    const temp = replaceUndefinedWithEmptyString(values);
    setValue(temp);
    if (tabActiveKey !== '1') setTabActiveKey('1');
  };

  const setTabItems: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Form Value',
        children: <pre>{JSON.stringify(value, null, 2)}</pre>,
      },
      {
        key: '2',
        label: 'Properties',
        children: <TreeSelectInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Tree Data',
        children: <TreeSelectDataPropertiesTable />,
      },
      {
        key: '4',
        label: 'Code',
        children: <TreeSelectInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '' || formUseWatch === undefined || formUseWatch?.length === 0) return setValue(undefined);
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Tree Select Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Field Size : </span>
            <Radio.Group
              value={fieldSize}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'middle', label: 'Middle' },
                { value: 'large', label: 'Large' },
              ]}
              onChange={(e) => setFieldSize(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <Checkbox
              checked={isMultiple}
              onChange={onChangeMultiple}
            >
              Is Multiple
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={isMandatory}
              onChange={onChangeIsMandatory}
            >
              Is Mandatory
            </Checkbox>
          </div>
        </div>
      </div>

      <Divider />

      <FormItemWrapper form={form} onFinishForm={onFinishForm}>
        <FormItemTreeSelect
          size={fieldSize}
          multiple={isMultiple}
          name='department'
          label='Department'
          treeData={treeData}
          isMandatory={isMandatory}
        />
        <FormItemSubmitButton />
      </FormItemWrapper>
      <Tabs
        centered
        items={setTabItems}
        defaultActiveKey="1"
        activeKey={tabActiveKey}
        onTabClick={(key) => setTabActiveKey(key)}
      />
    </Card>
  );
};