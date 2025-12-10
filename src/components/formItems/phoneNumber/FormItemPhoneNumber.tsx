import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Flex, Form, Input, Select, Space } from "antd";
import ReactCountryFlag from "react-country-flag";

import { formatPhoneNumberSimple } from "../../../modules";
import type { FilterFunc } from "rc-select/lib/Select";
import type { DefaultOptionType } from "antd/es/select";
import type { FlattenOptionData } from "rc-select/lib/interface";

import phoneCodeData from "./phoneCodeData.json";

interface ICountryPhoneCode extends DefaultOptionType {
  key: number,
  labe: string,
  value: string,
  countryFlag: string,
  slug: string,
  countryName: string
}

export const FormItemPhoneNumber: React.FC<IFormItem> = ({
  helper,
  disabled,
  isMandatory,
  fieldStatus,
  size = "middle",
}) => {
  const { t } = useTranslation();

  const name = 'phoneNumber';
  const label = t('phoneNumberForm.label');

  const formInstance = Form.useFormInstance();
  const formUseWatch = Form.useWatch(name, formInstance);  

  const customOptionRender = (option: FlattenOptionData<ICountryPhoneCode>) => {
    return (
      <Flex gap="small" align="center">
        <ReactCountryFlag countryCode={option.data.countryFlag} svg />
        <span>{option.label}</span>
      </Flex>
    );
  };

  const selectedLabel = useCallback((props: ICountryPhoneCode) => {
    const selected = phoneCodeData.find((option) => props.key === option.key);
    if (selected === undefined) return;
    return (
      <Flex gap="small" align="center">
        <ReactCountryFlag countryCode={selected?.countryFlag} svg />
        <span>{props.label}</span>
      </Flex>
    )
  }, [phoneCodeData]);

  const filterOption = (input: string, option?: ICountryPhoneCode) => option?.slug?.includes(input.toLowerCase()) || option?.value?.includes(input.toLowerCase());

  useEffect(() => {
    if (formUseWatch?.countryCode === undefined) return formInstance.setFieldValue('phoneNumber', { countryCode: 'US-1' });
  }, []);

  useEffect(() => {
    const selectedCountryCode = phoneCodeData.find((item) => formUseWatch?.countryCode === item.value);

    formInstance?.setFieldValue(name, {
      ...formUseWatch,
      phoneCode: selectedCountryCode?.label,
      countryName: selectedCountryCode?.countryName,
      formattedPhoneNumber: formatPhoneNumberSimple(selectedCountryCode?.label as string, formUseWatch?.phoneNumber),
    });
  }, [formInstance, formUseWatch, name, isMandatory]);

  return (
    <>
      <Form.Item
        help={helper}
        label={label}
        required={isMandatory}
        validateStatus={fieldStatus}
      >
        <Space.Compact
          block
          size={size}
        >
          <Form.Item
            noStyle
            name={[name as string, "countryCode"]}
            rules={[
              {
                required: isMandatory,
                message: t('phoneNumberForm.emptyCountryCode'),
              }
            ]}
          >
            <Select
              showSearch={true}
              disabled={disabled}
              style={{ width: 150 }}
              optionFilterProp="children"
              optionRender={customOptionRender}
              labelRender={selectedLabel as any}
              options={phoneCodeData as ICountryPhoneCode[]}
              placeholder={t('phoneNumberForm.countryCodePlaceholder')}
              filterOption={filterOption as FilterFunc<DefaultOptionType> | boolean | undefined}
            />
          </Form.Item>
          <Form.Item
            noStyle
            dependencies={[`${name}.countryCode`]}
            name={[name as string, "phoneNumber"]}
            rules={[
              {
                required: isMandatory,
                message: `${label} cannot be empty.`,
              },
              {
                pattern: /^[0-9]*$/,
                message: `Not a valid ${label}`,
              },
              {
                min: 10,
                max: 13,
                message: `${label} must between 10 and 13 characters long.`,
              }
            ]}
          >
            <Input
              autoComplete="off"
              disabled={disabled}
              placeholder={label}
            />
          </Form.Item>
        </Space.Compact>
        <Form.Item noStyle name={[name as string, "countryName"]}></Form.Item>
        <Form.Item noStyle name={[name as string, "phoneCode"]}></Form.Item>
        <Form.Item noStyle name={[name as string, "formattedPhoneNumber"]}></Form.Item>
        <div className="ant-form-item-additional">
          <div className="ant-form-item-explain ant-form-item-explain-connected">
            <span>{t('phoneNumberForm.phoneNumberFormHelper', { label })}</span>
          </div>
        </div>
      </Form.Item>
    </>
  );
};