import { Form } from "antd";

export const FormItemWrapper = <T,>({
  form,
  children,
  onFinishForm,
  disabled = false,
}: IFormItemWrapper<T>) => {
  return (
    <Form
      form={form}
      layout='vertical'
      autoComplete='off'
      disabled={disabled}
      onFinish={onFinishForm}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ width: "100%" }}
    >
      {children}
    </Form>
  );
};