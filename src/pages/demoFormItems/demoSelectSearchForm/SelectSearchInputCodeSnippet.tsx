import { Highlight, themes } from "prism-react-renderer"

export const SelectSearchInputCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import {
    FormItemSelectSearch,
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
    // ... rest of the data
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
          <FormItemSelectSearch
            size='middle'
            name='favoriteFruit'
            isMandatory={true}
            label='Favorite Fruit'
            selectOptions={fruitData}
            selectMode="multiple"
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