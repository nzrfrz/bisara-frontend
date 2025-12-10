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
  Select,
  Tabs,
  type CheckboxProps,
  type TabsProps
} from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemCurrencyInput, FormItemSubmitButton, FormItemWrapper } from "../../../components";

import currencyData from '../../../components/formItems/currencyInput/currencyData.json';
import { CurrencyInputFormPropertiesTable } from "./CurrencyInputFormPropertiesTable";
import { CurrencyInputFormCodeSnippet } from "./CurrencyInputFormCodeSnippet";

const currencyCodeOptions = currencyData.map((item) => {
  return {
    key: item.id,
    label: item.currencyCode,
    value: item.currencyCode
  }
});

export const DemoCurrencyInputForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('price', form);

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [iconPosition, setIconPosition] = useState<TInputIconPosition>('end');
  const [currencyCode, setCurrencyCode] = useState<TFormFieldCurrencyCode | string>('GBP');

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeIsMandatory: CheckboxProps['onChange'] = (e) => {
    setIsMandatory(e.target.checked);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeCurrencySelect = (value: TFormFieldCurrencyCode | string) => {
    setCurrencyCode(value);
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
        children: <CurrencyInputFormPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <CurrencyInputFormCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Currency Input Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 32, rowGap: 8 }}>
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
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Currency Code : </span>
            <Select
              size="small"
              value={currencyCode}
              style={{ width: 80 }}
              options={currencyCodeOptions}
              onChange={onChangeCurrencySelect}
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
        <FormItemCurrencyInput
          name='price'
          label='Price'
          size={fieldSize}
          isMandatory={isMandatory}
          iconPosition={iconPosition}
          currencyCode={currencyCode as TFormFieldCurrencyCode}
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