import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableWithSearch from '../../components/TableWithSearch';
import { useCheckItemManagement } from '../../hooks/useCheckItemManagement';
import AddCheckItemModal from '../../components/AddCheckItemModal';

const checkItemColumns = [
    { 
        title: '点检项名称', 
        dataIndex: 'ItemName', 
        key: 'ItemName' 
    },
    { 
        title: '点检方法', 
        dataIndex: 'ItemMethod', 
        key: 'ItemMethod' 
    },
    {
        title: '点检周期',
        dataIndex: 'ItemPeriod',
        key: 'ItemPeriod'
    },
];

const CheckItemManagement = () => {
    const { checkItems, isLoading, addCheckItem } = useCheckItemManagement();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 添加点检项按钮
    const addButton = (
        <Button 
            type="primary" 
            onClick={() => setIsModalVisible(true)}
        >
            添加点检项
        </Button>
    );

    return (
        <div>
            <TableWithSearch 
                columns={checkItemColumns}
                dataSource={checkItems}
                loading={isLoading}
                extraButton={addButton}
            />
            <AddCheckItemModal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onAdd={addCheckItem}
            />
        </div>
    );
};

export default CheckItemManagement;