import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Card,
  Form,
  Radio,
  Tabs,
  type TabsProps
} from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemNumberInput, FormItemSubmitButton, FormItemWrapper } from "../../../components";

import { NumberInputPropertiesTable } from "./NumberInputPropertiesTable";
import { NumberInputCodeSnippet } from "./NumberInputCodeSnippet";

export const DemoNumberInputForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('idCardNumber', form);

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [controlType, setControlType] = useState<TNumberFormControlType>('basic');

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

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
        children: <NumberInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <NumberInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Number Input Form" >

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
            <span style={{ color: 'gray', fontWeight: 700 }}>Control Type : </span>
            <Radio.Group
              value={controlType}
              options={[
                { value: 'basic', label: 'Basic' },
                { value: 'seperate', label: 'Seperate' },
                { value: 'combine', label: 'Combine' },
              ]}
              onChange={(e) => setControlType(e.target.value)}
            />
          </div>
        </div>
      </div>

      <FormItemWrapper form={form} onFinishForm={onFinishForm}>
        <FormItemNumberInput
          name='itemStock'
          label='Item Stock'
          size={fieldSize}
          controlType={controlType}
          minimumNumberAllowed={10}
          maximumNumberAllowed={100}
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