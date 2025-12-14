import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublicDictContext } from "./publicDictContextCreate";

import type { RadioChangeEvent } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";

import { useQueryHook } from "../../../../_utils";

const corpusListOptions: CheckboxGroupProps<string>['options'] = [
  { label: 'Lampung', value: 'lampung'},
  { label: 'Komering', value: 'komering'},
];

export const PublicDictContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigateTo = useNavigate();

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [corpusStatus, setCorpusStatus] = useState("VALID");
  const [corpusType, setCorpusType] = useState('lampung');

  const corpusList = useQueryHook<ApiSuccessResponse<{ meta: PaginationProps, itemList: IDictionaryData[] }>>(
    false,
    `/corpus-list/${corpusType}?page=${page}&limit=${limitPerPage}&q=${searchValue}`,
    ["corpusList", corpusType, page, limitPerPage, searchValue],
    10
  );
  // console.log("corpus list: \n", corpusList);

  const onChangeCorpus = ({ target: { value } }: RadioChangeEvent) => {
    setPage(1);
    setSearchValue("");
    setCorpusType(value);
  };

  useEffect(() => {
    navigateTo({ search: `?page=${page}&limit=${limitPerPage}&q=${searchValue}` }, { replace: true })
  }, [page, limitPerPage, searchValue]);

  const contextValue = {
    navigateTo,
    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,
    corpusStatus, setCorpusStatus,
    corpusType, setCorpusType,
    onChangeCorpus,
    corpusListOptions,
    corpusList,
  };

  return (
    <PublicDictContext.Provider value={contextValue as any}>
      {children}
    </PublicDictContext.Provider>
  );
};