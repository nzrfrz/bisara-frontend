import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Form,
  type TabsProps,
  type CheckboxProps,
  Card,
  Checkbox,
  Divider,
  Tabs,
  Radio,
} from "antd";
import type { RadioGroupOptionType } from "antd/es/radio";

import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemRadio, FormItemSubmitButton, FormItemWrapper } from "../../../components";
import { RadioInputPropertiesTable } from "./RadioInputPropertiesTable";
import { RadioDataPropertiesTable } from "./RadioDataPropertiesTable";
import { RadioInputCodeSnippet } from "./RadioInputCodeSnippet";

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

export const DemoRadioForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('favoriteFruit', form);

  const [radioType, setRadioType] = useState<RadioGroupOptionType>('default');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeRadioType: CheckboxProps['onChange'] = (e) => {
    setRadioType(e.target.value);
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
        children: <RadioInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Selection Data',
        children: <RadioDataPropertiesTable />,
      },
      {
        key: '4',
        label: 'Code',
        children: <RadioInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Radio Input Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 32, rowGap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Radio Type : </span>
            <Radio.Group
              value={radioType}
              options={[
                { value: 'default', label: 'Default' },
                { value: 'button', label: 'Button' },
              ]}
              onChange={onChangeRadioType}
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
        <FormItemRadio
          name='favoriteFruit'
          radioType={radioType}
          label='Favorite Fruit'
          selectionData={fruitData}
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