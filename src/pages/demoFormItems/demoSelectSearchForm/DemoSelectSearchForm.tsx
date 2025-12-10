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
import { FormItemSelectSearch, FormItemSubmitButton, FormItemWrapper } from "../../../components";
import { SelectSearchInputPropertiesTable } from "./SelectSearchInputPropertiesTable";
import { SelectSearchInputCodeSnippet } from "./SelectSearchInputCodeSnippet";
import { SelectSearchDataPropertiesTable } from "./SelectSearchDataPropertiesTable";

const fruitData = [
  {
    key: 0,
    label: 'Apple',
    value: 'apple'
  },
  {
    key: 1,
    label: 'Banana',
    value: 'banana'
  },
  {
    key: 2,
    label: 'Orange',
    value: 'orange'
  },
  {
    key: 3,
    label: 'Grapes',
    value: 'grapes'
  },
  {
    key: 4,
    label: 'Mango',
    value: 'mango'
  },
  {
    key: 5,
    label: 'Strawberry',
    value: 'strawberry'
  },
  {
    key: 6,
    label: 'Pineapple',
    value: 'pineapple'
  },
  {
    key: 7,
    label: 'Watermelon',
    value: 'watermelon'
  },
  {
    key: 8,
    label: 'Peach',
    value: 'peach'
  },
  {
    key: 9,
    label: 'Cherry',
    value: 'cherry'
  }
];

export const DemoSelectSearchForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('favoriteFruit', form);

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [selectMode, setSelectMode] = useState<TSelectSearchFormMode>('single');

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeSelectMode: CheckboxProps['onChange'] = (e) => {
    setSelectMode(e.target.value);
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
        children: <SelectSearchInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Option Data',
        children: <SelectSearchDataPropertiesTable />,
      },
      {
        key: '4',
        label: 'Code',
        children: <SelectSearchInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '' || formUseWatch === undefined || formUseWatch?.length === 0) return setValue(undefined);
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Select Search Input Form" >

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
            <span style={{ color: 'gray', fontWeight: 700 }}>Select Mode : </span>
            <Radio.Group
              value={selectMode}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'multiple', label: 'Multiple' },
              ]}
              onChange={onChangeSelectMode}
            />
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
        <FormItemSelectSearch
          size={fieldSize}
          name='favoriteFruit'
          isMandatory={isMandatory}
          label='Favorite Fruit'
          selectOptions={fruitData}
          selectMode={selectMode}
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