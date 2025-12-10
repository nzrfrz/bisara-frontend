import type { 
  ReactElement,
  JSXElementConstructor, 
} from "react";
import { useUploader } from "../useUploader";
import { uploaderConfig } from "../uploader.config";

import ImgCrop from "antd-img-crop";
import { 
  Image, 
  Progress, 
  theme, 
  Tooltip, 
  Upload, 
  type UploadFile 
} from "antd";
import { 
  PlusOutlined, 
  PictureOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';

export const UploadCard: React.FC<IFileUploaderRC> = ({
  cropBeforeUpload,
  multiple = uploaderConfig.multiUpload as boolean,
  maxCount = uploaderConfig.maximumFileToUpload,
  fileType = uploaderConfig.allowedFileType as TFileAlias,
  maxFileSize = uploaderConfig.isUseServerless === false ? undefined : uploaderConfig.serverlessMaxFileSize,
}) => {
  const { token: { colorError } } = theme.useToken();

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
    uploadProgressStatus,
    RenderUploaderHint,
  } = useUploader(multiple = false, fileType = 'image', maxFileSize);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Select File</div>
    </button>
  );

  const renderCustomFileList = (originNode: ReactElement<unknown, string | JSXElementConstructor<any>>, file: UploadFile) => {
    if (file.status === 'uploading') {
      return (
        <div className='ant-upload-list-item-container'>
          <div className='ant-upload-list-item ant-upload-list-item-uploading'>
            <div className='ant-upload-list-item-thumbnail'>Processing...</div>
            <div className='ant-upload-list-item-progress'>
              <Progress percent={Math.floor(file.percent as number)} size="small" showInfo={false} status={uploadProgressStatus} />
            </div>
          </div>
        </div>
      );
    }
    else if (file.status === 'error') {
      return (
        <Tooltip title={file.name}>
          <div className='ant-upload-list-item ant-upload-list-item-error'>
            <span className='ant-upload-list-item-thumbnail ant-upload-list-item-file'>
              <PictureOutlined style={{ color: colorError }} />
            </span>
            <div className='ant-upload-list-item-name'>{file.name}</div>
            <span className='ant-upload-list-item-actions' onClick={() => onRemove(file)}>
              <DeleteOutlined />
            </span>
          </div>
        </Tooltip>
      )
    }

    return originNode;
  };

  return (
    <>
      {
        cropBeforeUpload === true ?
          <ImgCrop rotationSlider
            showReset={true}
            cropShape='rect'
          >
            <Upload
              fileList={fileList}
              listType="picture-card"
              action={fileUploadEndpoint}
              onChange={(file) => onChange(file)}
              onRemove={(file) => onRemove(file)}
              onPreview={(file) => onPreview(file)}
              beforeUpload={(file) => onBeforeUpload(file)}
              itemRender={(originNode, file) => renderCustomFileList(originNode, file)}
            >
              {fileList.length >= (maxCount as number) ? null : uploadButton}
            </Upload>
          </ImgCrop>
          :
          <Upload
            fileList={fileList}
            listType="picture-card"
            action={fileUploadEndpoint}
            onChange={(file) => onChange(file)}
            onRemove={(file) => onRemove(file)}
            onPreview={(file) => onPreview(file)}
            beforeUpload={(file) => onBeforeUpload(file)}
            itemRender={(originNode, file) => renderCustomFileList(originNode, file)}
          >
            {fileList.length >= (maxCount as number) ? null : uploadButton}
          </Upload>
      }
      <RenderUploaderHint />

      {
        filePreviewData?.alias === 'image' &&
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewImageOpen,
            onVisibleChange: (visible) => setPreviewImageOpen(visible),
            afterOpenChange: (visible) => !visible && setFilePreviewData(undefined),
          }}
          src={filePreviewData.url}
          fallback={fallback}
          onError={() => {
            setFilePreviewData(undefined);
            setfallback(uploaderConfig.base64BrokenImage as string);
          }}
        />
      }
    </>
  );
};