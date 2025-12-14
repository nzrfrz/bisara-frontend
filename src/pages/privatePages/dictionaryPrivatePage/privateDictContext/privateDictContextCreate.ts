import { createContext } from 'react';

const intialPrivateDictContextValue: IPrivateDictionaryContext = {
  page: 1,
  setPage: () => { },
  limitPerPage: 10,
  setLimitPerPage: () => { },
  searchValue: "",
  setSearchValue: () => { },
  corpusStatus: "VALID",
  setCorpusStatus: () => { },
  corpusType: 'komering',
  setCorpusType: () => { },
  corpusListOptions: [],
  onChangeCorpus: () => { },
  corpusList: undefined,
  dictDetailModalOpen: false,
  setDictDetailModalOpen: () => { },
  onFinishForm: () => { }
};

export const PrivateDictContext = createContext<IPrivateDictionaryContext>(intialPrivateDictContextValue);