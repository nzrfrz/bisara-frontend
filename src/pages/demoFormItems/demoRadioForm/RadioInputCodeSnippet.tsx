import { Highlight, themes } from "prism-react-renderer"

export const RadioInputCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import {
    FormItemRadio,
    FormItemSubmitButton,
    FormItemWrapper
  } from "../components";
  import { replaceUndefinedWithEmptyString } from "../modules";

  const fruitData = [
    {
      key: 0,
      label: 'Apple',
      value: 'apple'
    },
    {
      key: 1,
      label: 'Banana',
      value: 'banana'
    },
    {
      key: 2,
      label: 'Orange',
      value: 'orange'
    },
    {
      key: 3,
      label: 'Grapes',
      value: 'grapes'
    }
      // rest of radio data
  ];

  export const Demo = () => {
    const [form] = Form.useForm();

    const onFinishForm = (values: Record<string, unknown>) => {
      const temp = replaceUndefinedWithEmptyString(values);
      console.log(temp);
    };

    return (
      <MainContainer>
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemRadio
            name='favoriteFruit'
            isMandatory={true}
            label='Favorite Fruit'
            selectionData={fruitData}
            radioType="default"
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