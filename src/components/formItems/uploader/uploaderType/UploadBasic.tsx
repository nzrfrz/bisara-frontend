import type { 
  ReactElement,
  JSXElementConstructor, 
} from "react";
import { useUploader } from "../useUploader";
import { uploaderConfig } from "../uploader.config";

import { 
  Image, 
  Button, 
  Upload 
} from "antd";
import { UploadOutlined } from '@ant-design/icons';

export const UploadBasic: React.FC<IFileUploaderRC> = ({
  multiple = uploaderConfig.multiUpload as boolean,
  maxCount = uploaderConfig.maximumFileToUpload,
  fileType = uploaderConfig.allowedFileType as TFileAlias,
  maxFileSize = uploaderConfig.isUseServerless === false ? undefined : uploaderConfig.serverlessMaxFileSize,
}) => {
  const {
    fileUploadEndpoint,
    fileList,
    onChange,
    onPreview,
    onRemove,
    onBeforeUpload,
    fallback, setfallback,
    previewImageOpen, setPreviewImageOpen,
    filePreviewData, setFilePreviewData,
    RenderUploaderHint,
  } = useUploader(multiple, fileType, maxFileSize);

  const renderMediaFilePreview = (originalNode: ReactElement<unknown, string | JSXElementConstructor<any>>) => {
    switch (filePreviewData?.alias) {
      case 'video':
        return (
          <div>
            <video autoPlay width="640" height="480" controls>
              <source src={filePreviewData.url} type={filePreviewData.mimeType} />
            </video>
          </div>
        );
      case 'audio':
        return (
          <div>
            <audio controls autoPlay>
              <source src={filePreviewData.url} type={filePreviewData.mimeType} />
            </audio>
          </div>
        );
      default:
        return originalNode;
    }
  };

  return (
    <>
      <Upload
        listType='text'
        multiple={multiple}
        maxCount={maxCount}
        fileList={fileList}
        action={fileUploadEndpoint}
        onChange={(file) => onChange(file)}
        onRemove={(file) => onRemove(file)}
        onPreview={(file) => onPreview(file)}
        beforeUpload={(file) => onBeforeUpload(file)}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
        <RenderUploaderHint />
      </Upload>

      {
        filePreviewData?.alias !== undefined &&
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewImageOpen,
            onVisibleChange: (visible) => setPreviewImageOpen(visible),
            afterOpenChange: (visible) => !visible && setFilePreviewData(undefined),
            imageRender(originalNode) {
              return renderMediaFilePreview(originalNode);
            },
            toolbarRender(originalNode) {
              if (filePreviewData?.alias === 'image') return originalNode;
              else return false
            },
          }}
          fallback={fallback}
          src={filePreviewData?.alias !== 'image' ? undefined : filePreviewData.url}
          onError={() => {
            setFilePreviewData(undefined);
            setfallback(uploaderConfig.base64BrokenImage as string);
          }}
        />
      }
    </>
  );
};