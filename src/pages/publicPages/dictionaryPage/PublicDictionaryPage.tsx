import { PublicDictDataGrid } from './PublicDictDataGrid';
import { PublicDictContextProvider } from './publicDictionaryContext/PublicDictContextProvider';

export const PublicDictionaryPage = () => {
  return (
    <PublicDictContextProvider>
      <PublicDictDataGrid />
    </PublicDictContextProvider>
  )
};