import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateDictContext } from "./privateDictContextCreate";

import { Form, type RadioChangeEvent } from "antd";
import type { CheckboxGroupProps } from "antd/es/checkbox";

import { useQueryHook } from "../../../../_utils";

const corpusListOptions: CheckboxGroupProps<string>['options'] = [
  { label: 'Lampung', value: 'lampung'},
  { label: 'Komering', value: 'komering'},
];

export const PrivateDictContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [form] = Form.useForm()
  const navigateTo = useNavigate();

  const [page, setPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [corpusStatus, setCorpusStatus] = useState("");
  const [corpusType, setCorpusType] = useState<TCorpusType | string>('lampung');
  const [dictDetailModalOpen, setDictDetailModalOpen] = useState(false);

  const corpusList = useQueryHook<ApiSuccessResponse<{ meta: PaginationProps, itemList: IDictionaryData[] }>>(
    false,
    `/corpus-list/${corpusType}?page=${page}&limit=${limitPerPage}&q=${searchValue}`,
    ["corpusList", corpusType, page, limitPerPage, searchValue],
    10
  );

  const onChangeCorpus = ({ target: { value } }: RadioChangeEvent) => {
    setPage(1);
    setSearchValue("");
    setCorpusType(value);
  };

  const onFinishForm = (values: IDictionaryData) => {
    console.log(values);
  };

  useEffect(() => {
    navigateTo({ search: `?bahasa=${corpusType}&page=${page}&limit=${limitPerPage}&status=${corpusStatus}&q=${searchValue}` }, { replace: true })
  }, [corpusType, page, limitPerPage, searchValue]);

  const contextValue = {
    form,
    navigateTo,
    page, setPage,
    limitPerPage, setLimitPerPage,
    searchValue, setSearchValue,
    corpusStatus, setCorpusStatus,
    corpusType, setCorpusType,
    onChangeCorpus,
    corpusListOptions,
    corpusList,
    onFinishForm,
    dictDetailModalOpen, setDictDetailModalOpen,
  };

  return (
    <PrivateDictContext.Provider value={contextValue}>
      {children}
    </PrivateDictContext.Provider>
  );
};