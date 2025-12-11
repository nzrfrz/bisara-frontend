import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../../globalContextCreate";

import { Form } from "antd";
import { 
  FormItemBasicInput, 
  FormItemPassword, 
  FormItemSubmitButton, 
  FormItemWrapper
} from "../../../components";
import { useLoginPage } from "./useLoginPage";

export const LoginPage = () => {
  const [form] = Form.useForm();
  const { loginCredential } = useContext(GlobalContext);

  const {
    onFinishForm
  } = useLoginPage();

  if (loginCredential) return <Navigate to={"/"} replace={true} />

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          minWidth: 266,
          width: 366,
        }}
      >
        <FormItemWrapper form={form} onFinishForm={onFinishForm}>
          <FormItemBasicInput
            name='credential'
            disabled={false}
            label='Username or Email'
            isMandatory={true}
            fieldStatus={undefined}
            helper={undefined}
          />
          <FormItemPassword
            isMandatory={true}
            useStrictPassword={false}
          />
          <FormItemSubmitButton isBlocked={true} position="left" />
        </FormItemWrapper>
      </div>
    </div>
  )
};