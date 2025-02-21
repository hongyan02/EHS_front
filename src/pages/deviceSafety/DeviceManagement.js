import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableWithSearch from '../../components/TableWithSearch';
import { deviceColumns } from '../../constants/tableColumns';
import { useDeviceManagement } from '../../hooks/useDeviceManagement';

const DeviceManagement = () => {
    const { devices, isLoading, addDevice } = useDeviceManagement();

    // 添加设备按钮
    const addButton = (
        <Button 
            type="primary" 
            onClick={() => {
                // TODO: 实现添加设备的逻辑
                console.log('添加设备');
            }}
        >
            添加设备
        </Button>
    );

    return (
        <div>
            <TableWithSearch 
                columns={deviceColumns}
                dataSource={devices}
                loading={isLoading}
                extraButton={addButton}
            />
        </div>
    );
};

export default DeviceManagement;