import { Table, Tag, type TableProps } from "antd";
import dateTimePickerFormPropertiesList from './DateTimePickerFormPropertiesList.json';

export const DateTimePickerPropertiesTable = () => {
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
                <Tag key={index}>
                  <span style={{ fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace' }}>{item}</span>
                </Tag>
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
          <span style={{ fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace' }}>{data === "" ? "-" : data}</span>
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={dateTimePickerFormPropertiesList as any}
      rowKey={(record) => record.id}
    />
  );
};