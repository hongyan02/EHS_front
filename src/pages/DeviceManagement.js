import React from 'react';
import TableWithSearch from '../components/TableWithSearch';

const DeviceManagement = () => {
    const data = [
        { key: '1', deviceId: 'D123', deviceName: '设备一', deviceLocaltion:'极片', addTime: '2024-01-01 10:00:00' },
        { key: '2', deviceId: 'D124', deviceName: '设备二', deviceLocaltion:'组装', addTime: '2024-01-02 14:30:00' },
        { key: '3', deviceId: 'D125', deviceName: '设备三', deviceLocaltion:'涂布', addTime: '2024-01-03 09:45:00' },
        { key: '4', deviceId: 'D126', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-04 09:45:00' },
        { key: '5', deviceId: 'D127', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-04 09:45:00' },
        { key: '6', deviceId: 'D128', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-05 09:45:00' },
        { key: '7', deviceId: 'D129', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-05 09:45:00' },
        { key: '8', deviceId: 'D130', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-05 09:45:00' },
        { key: '9', deviceId: 'D131', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-06 09:45:00' },
        { key: '10', deviceId: 'D132', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-07 09:45:00' },
        { key: '11', deviceId: 'D133', deviceName: '设备三', deviceLocaltion:'涂布',addTime: '2024-01-07 09:45:00' },
        // 更多数据
      ];
    
      // 表格列配置
      const columns = [
        { title: '设备ID', dataIndex: 'deviceId', key: 'deviceId' },
        { title: '设备名称', dataIndex: 'deviceName', key: 'deviceName' },
        { title: '车间位置', dataIndex: 'deviceLocaltion', key: 'deviceLocaltion' },
        {
          title: '添加时间',
          dataIndex: 'addTime',
          key: 'addTime',
          render: (text) => new Date(text).toLocaleString(),  // 格式化时间
        },
      ];
    
      return (
        <div>
          <TableWithSearch
            columns={columns}  // 动态传入列配置
            dataSource={data}   // 动态传入数据源
          />
        </div>
      );
    };
  
  export default DeviceManagement;