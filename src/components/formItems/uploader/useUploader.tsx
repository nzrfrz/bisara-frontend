import axios from "axios";
import {
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import type { UploadFile } from "antd";
import type { RcFile, UploadChangeParam } from "antd/es/upload";

import { GlobalContext } from "../../../globalContextCreate";
import { UploaderContext } from "./uploaderContext/uploaderCreateContext";
import { useTranslation } from "react-i18next";
import { uploaderConfig } from "./uploader.config";
import { webpImageConverter } from "./webpImageConverter";

type TProgressStatus = "success" | "normal" | "exception" | "active" | undefined;

export const useUploader = (
  multiple: boolean,
  fileType: TFileAlias,
  maxFileSize: number | undefined
) => {
  const { fileList, setFileList } = useContext(UploaderContext);

  const { t } = useTranslation();
  const { openMessage } = use(GlobalContext);

  const [fallback, setfallback] = useState<string>('');
  const [previewImageOpen, setPreviewImageOpen] = useState(false);
  const [uploadProgressStatus, setUploadProgressStatus] = useState<TProgressStatus>('success');
  const [filePreviewData, setFilePreviewData] = useState<IFilePreviewData | undefined>(undefined);

  const fileUploadEndpoint = useMemo(() => {
    if (uploaderConfig.isUseServerless === false) return uploaderConfig?.uploadEndpoint as string + maxFileSize?.toString() as string;
    else return uploaderConfig?.serverlessUploadEndpoint as string + maxFileSize?.toString() as string;
  }, [uploaderConfig, maxFileSize]);

  const fileDeleteEndpoint = useMemo(() => {
    if (uploaderConfig.isUseServerless === false) return uploaderConfig?.deleteEndpoint as string;
    else return uploaderConfig?.serverlessDeleteEndpoint as string;
  }, [uploaderConfig, maxFileSize]);

  const fileRequirementErrorMessage = useCallback((file: UploadFile) => {
    const isFileSizeAllowed = maxFileSize !== undefined ? file.size as number / 1024 / 1024 < maxFileSize! : true;
    const isFileFormatAllowed = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.isAllowed;
    const getFileFormat = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.fileType;
    const getFileAlias = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.alias;
    // console.log('error message: ', getFileFormat);

    let uploadErrorMessage: string | undefined;

    /** Condition 1: If getFileFormat is undefined, return "file format not detected" */
    if (!getFileFormat) {
      uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.undetectedFormatFile');
    }

    /** Condition for 'all' fileType with maxFileSize undefined and image conversion failure */
    else if (fileType === 'all' && maxFileSize === undefined && getFileAlias === 'image') {
      uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.undetectedFormatFile');
    }

    /** Condition for 'all' fileType with maxFileSize defined and size or conversion failure */
    else if (fileType === 'all' && maxFileSize !== undefined && !isFileSizeAllowed) {
      uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileSize', { maxFileSize });
    }
    else if (fileType === 'all' && maxFileSize !== undefined && isFileSizeAllowed && getFileAlias === 'image') {
      uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileSize', { maxFileSize });
    }

    /** Condition for image-specific fileType with conversion or size failure */
    else if (fileType !== 'all' && fileType === 'image' && getFileAlias === 'image' && isFileFormatAllowed) {
      if (maxFileSize !== undefined && !isFileSizeAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileSize', { maxFileSize });
      }
      else if (!isFileFormatAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileFormat');
      }
    }

    /** Condition for non-matching fileType and getFileAlias (e.g., fileType='video' but getFileAlias='audio') */
    else if (fileType !== 'all' && fileType !== getFileAlias) {
      uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileFormat');
    }

    /** Conditions for non-image, non-'all' fileType with matching alias */
    else if (fileType !== 'all' && fileType === getFileAlias && isFileFormatAllowed !== undefined) {
      if (maxFileSize === undefined && !isFileFormatAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileFormat');
      }
      else if (maxFileSize !== undefined && !isFileSizeAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileSize', { maxFileSize });
      }
      else if (maxFileSize !== undefined && isFileSizeAllowed && !isFileFormatAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + t('uploader.errorFileFormat');
      }
      else if (maxFileSize !== undefined && !isFileSizeAllowed && !isFileFormatAllowed) {
        uploadErrorMessage = file.originFileObj?.name + ' ' + `${t('uploader.errorFileFormat')}, ${t('uploader.errorFileSize', { maxFileSize })}`;
      }
    }

    return uploadErrorMessage;
  }, [maxFileSize, fileType]);

  const RenderUploaderText = () => {
    /** Set up the translator here */
    const uploaderText = multiple === true ? 'uploader.uploadMultipleText' : 'uploader.uploadSingleText';
    const translator = t(uploaderText, { fileType });

    return (<p className="ant-upload-text">{translator}</p>);
  };

  const RenderUploaderHint = () => {
    const allowedFileType = uploaderConfig?.fileFormatData?.filter((item) => item.alias === fileType && item.isAllowed === true);
    const getAllowedFileFormat = allowedFileType?.map((item) => item.fileType);
    const finalFileFormat = [...new Set(getAllowedFileFormat)];
    const allowedFileFormatText = finalFileFormat.join(', ').toUpperCase();

    /** Set up the translator here */
    const fileFormatHintText = fileType !== 'all' ? t('uploader.fileFormatHint', { allowedFileFormatText }) : undefined;
    const fileSizeHintText = maxFileSize !== undefined ? t('uploader.fileSizeHintText', { maxFileSize }) : undefined;

    return (<p style={{ marginBottom: 0 }}>{fileFormatHintText} {fileSizeHintText}</p>);
  };

  const DragAndDropUploaderHint = () => {
    const allowedFileType = uploaderConfig?.fileFormatData?.filter((item) => item.alias === fileType && item.isAllowed === true);
    const getAllowedFileFormat = allowedFileType?.map((item) => item.fileType);
    const finalFileFormat = [...new Set(getAllowedFileFormat)];
    const allowedFileFormatText = finalFileFormat.join(', ').toUpperCase();

    /** Set up the translator here */
    const fileFormatHintText = fileType !== 'all' ? t('uploader.fileFormatHint', { allowedFileFormatText }) : undefined;
    const fileSizeHintText = maxFileSize !== undefined ? t('uploader.fileSizeHintText', { maxFileSize }) : undefined;

    return (<p className="ant-upload-hint">{fileFormatHintText} {fileSizeHintText}</p>);
  };

  const onBeforeUpload = useCallback(async (file: RcFile) => {

    const isFileSizeAllowed = maxFileSize !== undefined ? file.size as number / 1024 / 1024 < maxFileSize! : true;
    const isFileFormatAllowed = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.isAllowed;
    const getFileFormat = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.fileType;
    const getFileAlias = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.alias;

    if (!getFileFormat) return false;

    if (fileType === 'all' && maxFileSize === undefined) {
      if (getFileAlias === 'image') {
        const convertResults = await webpImageConverter(file);
        if (convertResults) return convertResults;
      }
      return true;
    }

    if (fileType === 'all' && maxFileSize !== undefined && isFileSizeAllowed) {
      if (getFileAlias === 'image') {
        const convertResults = await webpImageConverter(file);
        if (convertResults) return convertResults;
      }
      return true;
    }

    if (fileType !== 'all' && fileType === 'image' && getFileAlias === 'image' && isFileFormatAllowed) {
      const convertResults = await webpImageConverter(file);
      if (maxFileSize === undefined || (maxFileSize !== undefined && isFileSizeAllowed)) {
        if (convertResults) return convertResults; /** Return the converted WebP file */
        return false;
      }
      return false;
    }

    if (fileType !== 'all' && fileType === getFileAlias && isFileFormatAllowed) {
      if (maxFileSize === undefined) return true;
      if (maxFileSize !== undefined && isFileSizeAllowed) return true;
    }

    return false
  }, [fileList, maxFileSize, fileType]);

  const onChange = (info: UploadChangeParam) => {
    const { status } = info.file;
    // console.log('on change: \n', info);

    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        /** change your upload result data here */
        file.name = file.response.data?.fileName || file.response?.data?.message || fileRequirementErrorMessage(file);
        file.url = file.response.data?.originalFileURL;
        file.uid = file.response.data?.fileName;
      }

      if (!file.status && file.percent === 0) {
        /** stop the file to be uploaded based on onBeforeUpload function */
        file.name = file.response?.data?.message || fileRequirementErrorMessage(file);
        file.status = 'error';
      }

      if (file.status === 'error' && file.percent === 0) {
        file.name = file.response?.data?.message || fileRequirementErrorMessage(file);
      }
      return file;
    });

    if (status === 'done') openMessage('success', t('uploader.uploadSuccess'));
    else if (status === 'error') openMessage('error', t('uploader.uploadFailed'));

    setFileList(newFileList);
  };

  const onPreview = (file: UploadFile) => {
    if (file.status === 'error') {
      setFilePreviewData(undefined);
      return;
    }

    const getFileAlias = uploaderConfig?.fileFormatData?.find((item) => item.mimeType === file.type)?.alias;

    const selectedFile = {
      alias: getFileAlias,
      mimeType: file.type,
      url: file.url
    };

    setFilePreviewData(selectedFile);

    if (getFileAlias === 'archive' || getFileAlias === 'document' || file.type === 'application/pdf') {
      return window.open(file.url, "_blank");
    }
    else {
      setFilePreviewData(selectedFile);
      setPreviewImageOpen(true);
      return;
    }
  };

  const onRemove = async (file: UploadFile) => {
    const DELETE_FILE_END_POINT = fileDeleteEndpoint + file.uid;
    // console.log('on remove: \n', file)

    if (file.status === 'error') {
      setFileList((prevList) =>
        prevList.filter((f) => f.uid !== file.uid)
      );
      return false;
    }
    else {
      setFileList((prevList) =>
        prevList.map((f) =>
          f.uid === file.uid ? { ...f, status: 'uploading' } : f
        )
      );

      try {
        setUploadProgressStatus('exception');
        await axios.delete(DELETE_FILE_END_POINT);

        setFileList((prevList) =>
          prevList.filter((f) => f.uid !== file.uid)
        );

        setUploadProgressStatus('success');
        openMessage('success', t('uploader.deleteSuccess'));
        return false;
      } catch (error) {
        setFileList((prevList) =>
          prevList.map((f) =>
            f.uid === file.uid ? { ...f, status: 'done' } : f
          )
        );

        openMessage('error', t('uploader.deleteFailed'));
        return false;
      }
    }
  };

  useEffect(() => {
    setFileList((prev: UploadFile[]) => {
      return prev.map((prevItem) => {
        if (prevItem.status === 'error') {
          return {
            ...prevItem,
            name: fileRequirementErrorMessage(prevItem) as string
          }
        }
        return prevItem;
      })
    });
  }, [t]);

  return {
    fileUploadEndpoint,
    fileList, setFileList,
    previewImageOpen, setPreviewImageOpen,
    filePreviewData, setFilePreviewData,
    fallback, setfallback,
    uploadProgressStatus, setUploadProgressStatus,
    onChange,
    onPreview,
    onRemove,
    onBeforeUpload,
    RenderUploaderText,
    RenderUploaderHint,
    DragAndDropUploaderHint,
  };
};