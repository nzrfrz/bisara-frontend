import { createContext } from 'react';

const intialPublicDictContextValue: IPublicDictionaryContext = {
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
  corpusList: undefined
};

export const PublicDictContext = createContext<IPublicDictionaryContext>(intialPublicDictContextValue);