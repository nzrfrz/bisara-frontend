import { useContext } from "react";

import { Table, type TableProps } from "antd";
import { PublicDictContext } from "./publicDictionaryContext/publicDictContextCreate";

export const PublicDictionaryTableData = () => {
  const { corpusList } = useContext(PublicDictContext);

  const columns: TableProps<IDictionaryData>["columns"] = [
    {
      title: "No",
      render: (_, __, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: "Indonesia",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
          <span>{record.indonesia}</span>
        </div>
      )
    },
    {
      title: "Lampung",
      key: 'lampung',
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
          <span>{record.lampung.join(', ')}</span>
        </div>
      )
    }
  ];

  return (
    <Table
      columns={columns as any}
      pagination={false}
      loading={corpusList?.isFetching}
      dataSource={corpusList?.data?.data.itemList}
      rowKey={(record) => record._id}
      scroll={{ x: 'auto', y: 550 }}
    />
  );
};