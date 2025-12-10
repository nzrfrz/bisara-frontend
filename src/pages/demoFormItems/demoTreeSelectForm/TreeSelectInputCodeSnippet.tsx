import { Highlight, themes } from "prism-react-renderer"

export const TreeSelectInputCodeSnippet = () => {
  const snippet = `
  import { Form } from "antd";

  import { MainContainer } from "../layout";
  import {
    FormItemSubmitButton,
    FormItemTreeSelect,
    FormItemWrapper
  } from "../components";
  import { replaceUndefinedWithEmptyString } from "../modules";

  const treeData = [
    {
      key: 'engineering',
      value: 'engineering',
      title: 'Engineering Department',
      children: [
        {
          key: 'frontend',
          value: 'frontend',
          title: 'Frontend Team',
          disableCheckbox: true,
          children: [
            {
              key: 'fe-lead',
              value: 'fe-lead',
              title: <b style={{ color: '#2a9d8f' }}>Frontend Team Lead</b>,
            },
            {
              key: 'fe-senior',
              value: 'fe-senior',
              title: 'Senior Frontend Developer',
            },
            {
              key: 'fe-junior',
              value: 'fe-junior',
              title: 'Junior Frontend Developer',
            },
          ],
        },
        {
          key: 'backend',
          value: 'backend',
          title: 'Backend Team',
          checkable: true,
          children: [
            {
              key: 'be-lead',
              value: 'be-lead',
              title: <b style={{ color: '#2a9d8f' }}>Backend Team Lead</b>,
            },
            {
              key: 'be-senior',
              value: 'be-senior',
              title: 'Senior Backend Developer',
            },
            {
              key: 'be-junior',
              value: 'be-junior',
              title: 'Junior Backend Developer',
            },
            {
              key: 'be-devops',
              value: 'be-devops',
              title: 'DevOps Engineer',
            },
          ],
        },
      ],
    },
    // rest of tree data
  ];

  export const Dashboard = () => {
    const [form] = Form.useForm();

    const onFinishForm = (values: Record<string, unknown>) => {
      const temp = replaceUndefinedWithEmptyString(values);
      console.log(temp);
    };

    return (
      <MainContainer>
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemTreeSelect
            size="middle"
            multiple={true}
            name='department'
            label='Department'
            isMandatory={true}
            treeData={treeData}
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