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
  Tabs,
  type CheckboxProps,
  type TabsProps
} from "antd";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemCheckBox, FormItemSubmitButton, FormItemWrapper } from "../../../components";
import { CheckboxInputPropertiesTable } from "./CheckboxInputPropertiesTable";
import { CheckboxInputCodeSnippet } from "./CheckboxInputCodeSnippet";
import { CheckboxDataPropertiesTable } from "./CheckboxDataPropertiesTable";

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

export const DemoCheckboxForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('dateTime', form);

  const [isMandatory, setIsMandatory] = useState<boolean>(true);

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

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
        children: <CheckboxInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Checkbox Data',
        children: <CheckboxDataPropertiesTable />,
      },
      {
        key: '4',
        label: 'Code',
        children: <CheckboxInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Checkbox Input Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 32, rowGap: 8 }}>
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
        <FormItemCheckBox
          name='favoriteFruits'
          label='Favorite Fruits'
          isMandatory={isMandatory}
          selectionData={fruitData}
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