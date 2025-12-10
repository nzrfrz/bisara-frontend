import { useMemo, useState } from "react";

import {
  Card,
  Checkbox,
  Divider,
  Form,
  InputNumber,
  Select,
  Tabs,
  type CheckboxProps,
  type InputNumberProps,
  type TabsProps
} from "antd";
import { replaceUndefinedWithEmptyString } from "../../modules";
import {
  FormItemSubmitButton,
  FormItemUploadFile,
  FormItemWrapper
} from "../../components";
import type { valueType } from "antd/es/statistic/utils";

const fileTypeSelectOptions = [
  {
    key: '1',
    value: 'all',
    label: 'All'
  },
  {
    key: '2',
    value: 'archive',
    label: 'Archive'
  },
  {
    key: '3',
    value: 'document',
    label: 'Document'
  },
  {
    key: '4',
    value: 'image',
    label: 'Image'
  },
  {
    key: '5',
    value: 'audio',
    label: 'Audio'
  },
  {
    key: '6',
    value: 'video',
    label: 'Video'
  }
];

export const UploaderBasicForm = () => {
  const [form] = Form.useForm();

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isMandatory, setIsMandatory] = useState<boolean>(true);
  const [fileType, setFileType] = useState<TFileAlias | string>('image');
  const [maxFileSize, setMaxFileSize] = useState<number>(2);

  const [value, setValue] = useState<Record<string, unknown>>();
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const setTabItems: TabsProps['items'] = useMemo(() => {
    return [
      {
        key: '1',
        label: 'Form Value',
        children: <pre>{JSON.stringify(value, null, 2)}</pre>,
      },
      {
        key: '3',
        label: 'Code',
        children: '<DateTimePickerFormCodeSnippet />',
      },
    ]
  }, [value]);

  const onChangeFileType = (value: TFormFieldCurrencyCode | string) => {
    setFileType(value);
    // form.resetFields();
    setValue(undefined);
  };

  const onChangeMaxFileSize: InputNumberProps['onChange'] = (value: valueType | null) => {
    setMaxFileSize(value as number);
    // form.resetFields();
    setValue(undefined);
  };

  const onChangeIsMandatory: CheckboxProps['onChange'] = (e) => {
    setIsMandatory(e.target.checked);
    // form.resetFields();
    setValue(undefined);
  };

  const onSubmitClick = () => setIsFormSubmitted(true);

  const onFinishForm = (values: Record<string, unknown>) => {
    const temp = replaceUndefinedWithEmptyString(values);
    setValue(temp);
    if (tabActiveKey !== '1') setTabActiveKey('1');
  };

  return (
    <Card type="inner" title="Basic Upload Form" >

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 32, rowGap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>File Type : </span>
            <Select
              size="small"
              value={fileType}
              style={{ width: 80 }}
              options={fileTypeSelectOptions}
              onChange={onChangeFileType}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ color: 'gray', fontWeight: 700 }}>Max File Size : </span>
            <InputNumber min={1} value={maxFileSize} size="small" onChange={onChangeMaxFileSize} />
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
        <FormItemUploadFile
          maxCount={7}
          fileType={fileType as TFileAlias}
          maxFileSize={maxFileSize}
          label="Basic Upload File"
          name="uploadedFileBasic"
          isMandatory={isMandatory}
          uploaderType='basic'
          isFormSubmitted={isFormSubmitted}
        />
        <FormItemSubmitButton onClick={onSubmitClick} />
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