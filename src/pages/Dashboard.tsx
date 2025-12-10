import { Form } from "antd";

import { MainContainer } from "../layout";
import {
  FormItemSubmitButton,
  FormItemUploadFile,
  FormItemWrapper
} from "../components";
import { replaceUndefinedWithEmptyString } from "../modules";
import { useState } from "react";

export const Dashboard = () => {
  const [form] = Form.useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const onSubmitClick = () => setIsFormSubmitted(true);

  const onFinishForm = (values: Record<string, unknown>) => {
    const temp = replaceUndefinedWithEmptyString(values);
    console.log(temp);
  };  

  return (
    <MainContainer>
      <FormItemWrapper form={form} onFinishForm={onFinishForm}>
        <FormItemUploadFile
          maxCount={7}
          fileType="all"
          maxFileSize={4}
          label="Upload File"
          name="uploadedFile"
          isMandatory={true}
          uploaderType='card'
          cropBeforeUpload={true}
          isFormSubmitted={isFormSubmitted}
        />
        <FormItemSubmitButton onClick={onSubmitClick} />
      </FormItemWrapper>
    </MainContainer>
  );
};