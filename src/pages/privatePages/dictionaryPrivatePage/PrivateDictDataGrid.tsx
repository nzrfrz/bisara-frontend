import { useContext } from "react";
import { PrivateDictContext } from "./privateDictContext/privateDictContextCreate";

import { PrivateDictTableData } from "./PrivateDictTableData";

import { SearchInput } from "../../../components";
import { useDebounce } from "../../../_utils";

import { Pagination, Radio } from "antd";

import styles from './PrivateDictPage.module.css';

export const PrivateDictDataGrid = () => {
  const {
    page, setPage,
    setLimitPerPage,
    corpusListOptions,
    onChangeCorpus,
    corpusType,
    corpusList,
    setSearchValue
  } = useContext(PrivateDictContext);

  const debounceSave = useDebounce((nextValue) => {
      setPage(1);
      setSearchValue && setSearchValue(nextValue);
    }, 700);

  return (
    <div className={styles.container} >
      <div className={styles.tableWrapper}>
        <div className={styles.headerWrapper}>
          <Radio.Group
            options={corpusListOptions}
            optionType="button"
            onChange={onChangeCorpus}
            value={corpusType}
            size='large'
            disabled={corpusList?.isFetching}
          />
          <div>
            <SearchInput
              size="large"
              placeHolder="Cari Kata"
              onChange={(e) => debounceSave(e.target.value)}
              onSearch={(value) => setSearchValue && setSearchValue(value)}
              disabled={corpusList?.isFetching}
            />
          </div>
        </div>
        <PrivateDictTableData />
        <Pagination
          current={page}
          showQuickJumper={true}
          showSizeChanger={true}
          disabled={corpusList?.isFetching as boolean}
          total={corpusList?.data && corpusList?.data.data.meta.totalPage}
          onChange={async (currentPage) => setPage && setPage(currentPage)}
          style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
          onShowSizeChange={(_, pageSize) => setLimitPerPage && setLimitPerPage(pageSize)}
          showTotal={(total, range) => { return `${range[0]}-${range[1]} of ${total} items` }}
        />
      </div>
    </div>
  );
};