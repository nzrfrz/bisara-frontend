import { UploadFileFormRC } from "./UploadFileFormRC";
import { UploaderContextProvider } from "./uploaderContext/UploaderContextProvider";

export const FormItemUploadFile: React.FC<IFormUploadFile> = ({
  name,
  label,
  fileType,
  maxCount,
  multiple,
  maxFileSize,
  isMandatory,
  isFormSubmitted = false,
  cropBeforeUpload = false,
  uploaderType = 'drag-and-drop',
}) => {
  return (
    <UploaderContextProvider>
      <UploadFileFormRC
        name={name}
        label={label}
        fileType={fileType}
        maxCount={maxCount}
        multiple={multiple}
        maxFileSize={maxFileSize}
        isMandatory={isMandatory}
        uploaderType={uploaderType}
        isFormSubmitted={isFormSubmitted}
        cropBeforeUpload={cropBeforeUpload}
      />
    </UploaderContextProvider>
  );
};