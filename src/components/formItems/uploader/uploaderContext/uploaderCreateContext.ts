import { createContext } from "react";
import type { UploadFile } from "antd";

export interface IUploaderContextProps {
  fileList: UploadFile[] | [],
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[] | []>>
}

const uploaderContextValue: IUploaderContextProps = {
  fileList: [],
  setFileList: () => { },
};

export const UploaderContext = createContext<IUploaderContextProps>(uploaderContextValue);