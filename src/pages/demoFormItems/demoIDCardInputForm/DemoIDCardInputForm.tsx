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
  FormItemSubmitButton,
  FormItemIDCardInput,
} from "../../../components";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { IdCardInputFormPropertiesTable } from "./IdCardInputFormPropertiesTable";
import { IdCardInputFormCodeSnippet } from "./IdCardInputFormCodeSnippet";

export const DemoIDCardInputForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('idCardNumber', form);

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [iconPosition, setIconPosition] = useState<TInputIconPosition>('end');

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
        children: <IdCardInputFormPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <IdCardInputFormCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '' || formUseWatch === undefined) return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="ID Card Input Form" >

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
            <span style={{ color: 'gray', fontWeight: 700 }}>Icon Position : </span>
            <Radio.Group
              value={iconPosition}
              options={[
                { value: 'end', label: 'End' },
                { value: 'start', label: 'Start' },
              ]}
              onChange={(e) => setIconPosition(e.target.value)}
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
        <FormItemIDCardInput
          size={fieldSize}
          isMandatory={isMandatory}
          iconPosition={iconPosition}
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