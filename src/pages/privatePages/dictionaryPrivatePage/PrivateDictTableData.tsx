import { useContext } from "react";
import dayjs from "dayjs";
import { PrivateDictContext } from "./privateDictContext/privateDictContextCreate";

import { CustomButton } from "../../../components";
import { toTitleCase } from "../../../modules";

import { Table, Tag, type TableProps } from "antd";
import { FiMoreVertical } from "react-icons/fi";

export const PrivateDictTableData = () => {
  const {
    form,
    corpusList,
    corpusType,
    setDictDetailModalOpen
  } = useContext(PrivateDictContext);

  const columns: TableProps<IDictionaryData>["columns"] = [
    {
      title: "No",
      width: 25,
      render: (_, __, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: "Indonesia",
      width: 75,
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
          <span>{record.indonesia}</span>
        </div>
      )
    },
    {
      title: toTitleCase(corpusType),
      key: corpusType,
      width: 100,
      render: (_, record) => {
        const value = (record as any)[corpusType];
        return (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
            <span>{value?.join(', ')}</span>
          </div>
        )
      }
    },
    {
      title: "Update",
      width: 35,
      render: (_, record) => (
        <span>{dayjs(record.updatedAt).format('DD MMM YYYY')}</span>
      )
    },
    {
      title: "Status",
      width: 30,
      render: (_, record) => (
        <Tag color={record?.status === "NOT VALID" ? "red" : "lime"}>{record?.status}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 20,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CustomButton
            size="small"
            shape="circle"
            icon={<FiMoreVertical />}
            onClick={() => {
              const value = (record as any)[corpusType];
              form?.setFieldsValue({
                indonesia: record.indonesia,
                [corpusType]: value
              })
              setDictDetailModalOpen && setDictDetailModalOpen(true)
            }}
          />
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
      scroll={{ x: 1024, y: 550 }}
    />
  );
};