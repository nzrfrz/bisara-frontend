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
  InputNumber,
  Tabs,
  type CheckboxProps,
  type InputNumberProps,
  type TabsProps
} from "antd";
import { replaceUndefinedWithEmptyString } from "../../../modules";
import { FormItemSlider, FormItemSubmitButton, FormItemWrapper } from "../../../components";
import type { valueType } from "antd/es/statistic/utils";
import { SliderPropertiesTable } from "./SliderPropertiesTable";
import { SliderFormCodeSnippet } from "./SliderFormCodeSnippet";

export const DemoSliderForm = () => {
  const [form] = Form.useForm();
  const formUseWatch = Form.useWatch('sliderForm', form);

  const [minValue, setMinValue] = useState<valueType>(10);
  const [maxValue, setMaxValue] = useState<valueType>(150);
  const [stepValue, setStepValue] = useState<valueType>(1);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [isRange, setIsRange] = useState<boolean>(false);
  const [isMandatory, setIsMandatory] = useState<boolean>(true);

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onChangeMinValue: InputNumberProps['onChange'] = (value: valueType | null) => {
    setMinValue(value as number);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeMaxValue: InputNumberProps['onChange'] = (value: valueType | null) => {
    setMaxValue(value as number);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeStepValue: InputNumberProps['onChange'] = (value: valueType | null) => {
    setStepValue(value as number);
    form.resetFields();
    setValue(undefined);
  };

  const onChangeIsRange: CheckboxProps['onChange'] = (e) => {
    setIsRange(e.target.checked);
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
        children: <SliderPropertiesTable />,
      },
      {
        key: '3',
        label: 'Code',
        children: <SliderFormCodeSnippet />,
      },
    ]
  }, [value]);

  useEffect(() => {
    if (formUseWatch === '') return setValue(undefined)
  }, [formUseWatch]);

  return (
    <Card type="inner" title="Slider Input Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 32, rowGap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Min : </span>
            <InputNumber min={1} value={minValue} size="small" onChange={onChangeMinValue} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Max : </span>
            <InputNumber min={1} size="small" value={maxValue} onChange={onChangeMaxValue} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Step : </span>
            <InputNumber min={1} size="small" value={stepValue} onChange={onChangeStepValue} />
          </div>
          <div>
            <Checkbox
              checked={isVertical}
              onChange={(e) => setIsVertical(e.target.checked)}
            >
              Vertical
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={isRange}
              onChange={onChangeIsRange}
            >
              Use Range
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
        <FormItemSlider
          name='sliderForm'
          label='Slider Form'
          range={isRange}
          vertical={isVertical}
          min={minValue as number}
          max={maxValue as number}
          step={stepValue as number}
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