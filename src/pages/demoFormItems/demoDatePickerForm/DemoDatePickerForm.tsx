import { useEffect, useMemo, useState } from "react";

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
import { 
  FormItemDateTimePicker, 
  FormItemSubmitButton, 
  FormItemWrapper
} from "../../../components";
import { DateTimePickerFormCodeSnippet } from "./DateTimePickerFormCodeSnippet";
import { DateTimePickerPropertiesTable } from "./DateTimePickerPropertiesTable";

const pickerTypeData = [
  {
    key: '1',
    value: 'date',
    label: 'Date'
  },
  {
    key: '2',
    value: 'week',
    label: 'Week'
  },
  {
    key: '3',
    value: 'month',
    label: 'Month'
  },
  {
    key: '4',
    value: 'quarter',
    label: 'Quarter'
  },
  {
    key: '5',
    value: 'year',
    label: 'Year'
  }
];

export const DemoDatePickerForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('dateTime', form);  

  const [fieldSize, setFieldSize] = useState<SizeType>('middle');
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [isPickerWithTime, setIsPickerWithTime] = useState<boolean>(true);
  const [pickerFieldType, setPickerFieldType] = useState<TDateTimePickerFormMode>('single');
  const [pickerType, setPickerType] = useState<TDateTimePickerFormType | string>('date');

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeIsPickerWithTime: CheckboxProps['onChange'] = (e) => {
    setIsPickerWithTime(e.target.checked);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeIsMandatory: CheckboxProps['onChange'] = (e) => {
    setIsMandatory(e.target.checked);
    form.resetFields();
    setValue(undefined);
  };

  const onChangePickerType = (value: TFormFieldCurrencyCode | string) => {
    setPickerType(value);
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
        children: <DateTimePickerPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <DateTimePickerFormCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch?.originalCalendar === null || formUseWatch?.originalCalendarStart === undefined) return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Date Time Picker Input Form" >

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
            <span style={{ color: 'gray', fontWeight: 700 }}>Picker Field Type : </span>
            <Radio.Group
              value={pickerFieldType}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'range', label: 'Range' },
              ]}
              onChange={(e) => setPickerFieldType(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Picker Type : </span>
            <Select
              size="small"
              value={pickerType}
              style={{ width: 80 }}
              options={pickerTypeData}
              onChange={onChangePickerType}
            />
          </div>
          <div>
            <Checkbox
              checked={isPickerWithTime}
              onChange={onChangeIsPickerWithTime}
            >
              With Time
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
        <FormItemDateTimePicker
          name='dateTime'
          size={fieldSize}
          label='Date Time Picker'
          isMandatory={isMandatory}
          withTime={isPickerWithTime}
          pickerFieldType={pickerFieldType}
          pickerType={pickerType as TDateTimePickerFormType}
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