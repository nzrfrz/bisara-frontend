import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Checkbox,
  Form,
  Radio,
  Tabs,
  type CheckboxProps,
  type TabsProps
} from "antd";
import {
  FormItemWrapper,
  FormItemBasicInput,
  FormItemSubmitButton,
} from "../../../components";

import { BasicInputCodeSnippet } from "./BasicInputCodeSnippet";
import { BasicInputPropertiesTable } from "./BasicInputPropertiesTable";
import { replaceUndefinedWithEmptyString } from "../../../modules";

import type { SizeType } from "antd/es/config-provider/SizeContext";

export const DemoBasicInputField = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('username', form);

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
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
        children: <BasicInputPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <BasicInputCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Basic Input Form" >
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
      <FormItemWrapper form={form} onFinishForm={onFinishForm}>
        <FormItemBasicInput
          name='username'
          disabled={false}
          label='Username'
          isMandatory={isMandatory}
          addonAfter="suff"
          addonBefore="pref"
          fieldStatus={undefined}
          helper={undefined}
          size={fieldSize}
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