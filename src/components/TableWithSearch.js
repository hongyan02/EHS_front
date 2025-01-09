import React, { useState } from 'react';
import { Table, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';  // 搜索图标
import { debounce } from 'lodash';  // 用于防抖搜索

const TableWithSearch = ({ columns, dataSource, pagination = true, rowKey = "key" }) => {
  const [searchText, setSearchText] = useState('');  // 搜索输入框的内容
  const [filteredData, setFilteredData] = useState(dataSource);  // 筛选后的数据

  // 搜索功能：过滤数据
  const handleSearch = debounce((value) => {
    const filtered = dataSource.filter(item =>
      columns.some(col =>
        item[col.dataIndex]?.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, 300);  // 使用防抖，延迟 300ms 执行

  // 更新搜索文本
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);  // 执行搜索
  };

  return (
    <div>
      {/* 搜索框 */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="搜索"
          value={searchText}
          onChange={onSearchChange}
          suffix={<SearchOutlined />}
          style={{ width: 200 }}
        />
      </Space>

      {/* 表格 */}
      <Table style={{}}
        columns={columns}
        dataSource={filteredData}
        pagination={pagination ? { pageSize: 10 } : false}  
        rowKey={rowKey}
        bordered
      />
    </div>
  );
};

export default TableWithSearch;
