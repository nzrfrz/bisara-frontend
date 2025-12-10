import { 
  useMemo, 
  type ReactElement,
  type JSXElementConstructor, 
} from "react";
import { useUploader } from "../useUploader";
import { uploaderConfig } from "../uploader.config";

import { 
  theme, 
  Image, 
  Upload 
} from "antd";
import { CloudUploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const UploadDragAndDrop: React.FC<IFileUploaderRC> = ({
	multiple = uploaderConfig.multiUpload as boolean,
	maxCount = uploaderConfig.maximumFileToUpload,
	fileType = uploaderConfig.allowedFileType as TFileAlias,
	maxFileSize = uploaderConfig.isUseServerless === false ? undefined : uploaderConfig.serverlessMaxFileSize,
	isFormError = false,
}) => {
	const { token: { colorError } } = theme.useToken();

	const formErrorStyle = useMemo(() => {
		return {
			border: isFormError === true ? `1px dashed ${colorError}` : undefined
		}
	}, [isFormError, colorError]);

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
		RenderUploaderText,
		DragAndDropUploaderHint,
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
			<Dragger
				multiple={multiple}
				maxCount={maxCount}
				fileList={fileList}
				listType='picture'
				progress={{
					showInfo: false,
					size: ["100%", 5],
					status: uploadProgressStatus
				}}
				action={fileUploadEndpoint}
				onChange={(file) => onChange(file)}
				onRemove={(file) => onRemove(file)}
				onPreview={(file) => onPreview(file)}
				beforeUpload={(file) => onBeforeUpload(file)}
				style={formErrorStyle}
			>
				<p className="ant-upload-drag-icon"><CloudUploadOutlined /></p>
				<RenderUploaderText />
				<DragAndDropUploaderHint />
			</Dragger>

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