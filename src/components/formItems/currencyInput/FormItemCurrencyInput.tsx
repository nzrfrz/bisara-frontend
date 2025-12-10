import { useEffect, useMemo } from "react";

import { Form, InputNumber, type InputNumberProps } from "antd";
import { useTranslation } from "react-i18next";

import currencyData from './currencyData.json';

interface IFormItemCurrencyInput extends IFormItem {
  currencyCode?: TFormFieldCurrencyCode,
}

export const FormItemCurrencyInput: React.FC<IFormItemCurrencyInput> = ({
  name,
  label,
  helper,
  disabled,
  addonAfter,
  addonBefore,
  fieldStatus,
  size = "middle",
  noStyle = false,
  isMandatory = true,
  currencyCode = 'USD',
  iconPosition = 'start',
}) => {
  const { t } = useTranslation();

  const formInstance = Form.useFormInstance();
  const formUseWatch = Form.useWatch(name, formInstance);

  const currencySymbol = useMemo(() => {
    return currencyData.find((item) => item.currencyCode === currencyCode)?.currencySymbol;
  }, [currencyCode, currencyData]);

  const formatter: InputNumberProps<number>['formatter'] = (value) => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  useEffect(() => {
    if (formUseWatch?.plainCurrency === undefined) return;

    formInstance.setFieldValue(name, {
      ...formUseWatch,
      formattedCurrency: currencySymbol + ' ' + formatter(formUseWatch.plainCurrency, { userTyping: false, input: '' })
    });
  }, [formInstance, formUseWatch, currencySymbol]);

  return (
    <Form.Item
      label={label}
      required={isMandatory}
    >
      <Form.Item
        help={helper}
        noStyle={noStyle}
        validateStatus={fieldStatus}
        name={[name as string, 'plainCurrency']}
        rules={[
          {
            required: isMandatory,
            message: t('emptyFormField'),
          },
        ]}
      >
        <InputNumber<number>
          size={size}
          controls={false}
          disabled={disabled}
          formatter={formatter}
          style={{ width: '100%' }}
          placeholder={`Input ${label}`}
          addonAfter={iconPosition === 'end' ? currencyCode : addonAfter}
          addonBefore={iconPosition === 'start' ? currencyCode : addonBefore}
          parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
        />
      </Form.Item>
      <Form.Item noStyle name={[name as string, 'formattedCurrency']}></Form.Item>
    </Form.Item>
  );
};