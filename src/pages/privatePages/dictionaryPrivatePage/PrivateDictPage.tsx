import { MainContainer } from "../../../layout";
import { PrivateDictDataGrid } from "./PrivateDictDataGrid";
import { PrivateDictModalDetail } from "./PrivateDictModalDetail";
import { PrivateDictContextProvider } from "./privateDictContext/PrivateDictContextProvider";

export const PrivateDictPage = () => {
  return (
    <PrivateDictContextProvider>
      <MainContainer scrolly={true}>
        <PrivateDictDataGrid />
        <PrivateDictModalDetail />
      </MainContainer>
    </PrivateDictContextProvider>
  )
};