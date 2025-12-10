import { 
  useContext, 
  useEffect, 
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import { UploaderContext } from "./uploaderContext/uploaderCreateContext";

import {
  Form,
  theme,
} from "antd";

import { uploaderConfig } from "./uploader.config";
import { UploadBasic } from "./uploaderType/UploadBasic";
import { UploadCard } from "./uploaderType/UploadCard";
import { UploadAvatar } from "./uploaderType/UploadAvatar";
import { UploadDragAndDrop } from "./uploaderType/UploadDragAndDrop";

export const UploadFileFormRC: React.FC<IFormUploadFile> = ({
  name,
  label,
  uploaderType,
  isFormSubmitted,
  cropBeforeUpload,
  isMandatory = true,
  multiple = uploaderConfig.multiUpload as boolean,
  maxCount = uploaderConfig.maximumFileToUpload,
  fileType = uploaderConfig.allowedFileType as TFileAlias,
  maxFileSize = uploaderConfig.isUseServerless === false ? undefined : uploaderConfig.serverlessMaxFileSize,
}) => {
  const { t } = useTranslation();
  const formInstance = Form.useFormInstance();
  const { token: { colorError } } = theme.useToken();
  const { fileList } = useContext(UploaderContext);

  const isFormError = useMemo(() => {
    if (isMandatory === true && isFormSubmitted === true && fileList.length >= 1) return false;
    if (isMandatory === true && isFormSubmitted === true && fileList.length === 0) return true;
  }, [isMandatory, isFormSubmitted, fileList]);

  const formErrorHelper = useMemo(() => {
    const hasUndefined = fileList.map((item) => item.response).includes(undefined as never);
    if (isMandatory === true && isFormSubmitted === true && fileList.length === 0) {
      return <span style={{ color: colorError, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace' }}>{t('uploader.errorFormRequired')}</span>
    }
    else if (isMandatory === true && isFormSubmitted === true && fileList.length > 0 && hasUndefined === true) {
      return <span style={{ color: colorError, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace' }}>{t('uploader.errorFormValues')}</span>
    }

    return undefined;
  }, [isFormSubmitted, fileList]);

  const renderUploaderType = useMemo(() => {
    switch (uploaderType) {
      case 'card':
        return (
          <UploadCard
            fileType={fileType}
            multiple={multiple}
            maxCount={maxCount}
            maxFileSize={maxFileSize}
            isFormError={isFormError}
            cropBeforeUpload={cropBeforeUpload}
          />
        );
      case 'avatar':
        return (
          <UploadAvatar
            fileType={fileType}
            multiple={multiple}
            maxCount={maxCount}
            maxFileSize={maxFileSize}
            isFormError={isFormError}
            cropBeforeUpload={cropBeforeUpload}
          />
        );
      case 'drag-and-drop':
        return (
          <UploadDragAndDrop
            fileType={fileType}
            multiple={multiple}
            maxCount={maxCount}
            maxFileSize={maxFileSize}
            isFormError={isFormError}
          />
        );
      default:
        return (
          <UploadBasic
            fileType={fileType}
            multiple={multiple}
            maxCount={maxCount}
            maxFileSize={maxFileSize}
            isFormError={isFormError}
          />
        );
    }
  }, [uploaderType, fileType, multiple, maxCount, maxFileSize, isFormError]);

  useEffect(() => {
    const uploadedFileData = fileList.map((item) => {
      return item?.response?.data;
    });
    formInstance?.setFieldValue(name, uploadedFileData);
  }, [formInstance, fileList]);

  return (
    <Form.Item
      label={label}
      required={isMandatory}
      help={formErrorHelper}
    >
      <Form.Item
        noStyle
        name={[name as string]}
      >
        {renderUploaderType}
      </Form.Item>
    </Form.Item>
  );
};