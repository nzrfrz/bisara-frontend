import { Highlight, themes } from "prism-react-renderer"

export const BasicInputCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import { 
    FormItemBasicInput, 
    FormItemSubmitButton, 
    FormItemWrapper 
  } from "../components";
  import { replaceUndefinedWithEmptyString } from "../../../modules";

  export const Demo = () => {
    const [form] = Form.useForm();

    const onFinishForm = (values: Record<string, unknown>) => {
      const temp = replaceUndefinedWithEmptyString(values);
      console.log(values);
    };

    return (
      <MainContainer>
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemBasicInput
            name='username'
            disabled={false}
            label='Username'
            isMandatory={true}
            addonAfter="suff"
            addonBefore="pref"
            fieldStatus={undefined}
            helper={undefined}
            size="middle"
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