import { Highlight, themes } from "prism-react-renderer"

export const DateTimePickerFormCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import {
    FormItemDateTimePicker,
    FormItemSubmitButton,
    FormItemWrapper
  } from "../components";
  import { replaceUndefinedWithEmptyString } from "../modules";

  export const Demo = () => {
    const [form] = Form.useForm();

    const onFinishForm = (values: Record<string, unknown>) => {
      const temp = replaceUndefinedWithEmptyString(values);
      console.log(temp);
    };

    return (
      <MainContainer>
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemDateTimePicker
            name='dateTime'
            withTime={true}
            pickerType="date"
            isMandatory={true}
            label='Date Time Picker'
            pickerFieldType='single'
          />
          <FormItemSubmitButton />
        </FormItemWrapper>
      </MainContainer>
    );
  };
  `;

  return (
    <Highlight
      theme={themes.vsDark}
      code={snippet}
      language="tsx"
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};