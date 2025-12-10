import { useState } from "react";
import type { UploadFile } from "antd";

import { UploaderContext, type IUploaderContextProps } from "./uploaderCreateContext";

export const UploaderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
    
  const contextValues: IUploaderContextProps = {
    fileList, setFileList,
  };

  return (
    <UploaderContext value={contextValues}>
      {children}
    </UploaderContext>
  );
};