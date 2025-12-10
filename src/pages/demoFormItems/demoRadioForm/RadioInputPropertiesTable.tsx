import { Table, Tag, type TableProps } from "antd";
import radioInputPropertiesList from './radioInputPropertiesList.json';

export const RadioInputPropertiesTable = () => {
  const columns: TableProps<Record<string, any>>['columns'] = [
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (data) => {
        return (
          <>
            {
              data.map((item: string, index: number) =>
                <Tag key={index}>{item}</Tag>
              )
            }
          </>
        );
      }
    },
    {
      title: 'Default',
      dataIndex: 'default',
      key: 'default',
      render: (data) => {
        return (
          <span>{data === "" ? "-" : data}</span>
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={radioInputPropertiesList}
      rowKey={(record) => record.id}
    />
  );
};