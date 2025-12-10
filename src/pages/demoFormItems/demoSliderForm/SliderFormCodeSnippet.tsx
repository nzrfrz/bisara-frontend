import { Highlight, themes } from "prism-react-renderer"

export const SliderFormCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import {
    FormItemSlider,
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
          <FormItemSlider
            min={10}
            max={150}
            name='slider'
            label='Slider Form'
            range={true}
            isMandatory={true}
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