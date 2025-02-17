import React, { useState } from 'react';
import { Typography, Card, Button, Space } from 'antd';
import AddCheckItemModal from '../components/AddCheckItemModal';
import TableWithSearch from '../components/TableWithSearch';

const { Title } = Typography;

const CheckItemManagement = () => {
    const [visible, setVisible] = useState(false);
    const [checkItems, setCheckItems] = useState([
        { id: 1, ItemName: '项目1', ItemMethod: '方法1', ItemPeriod: 'daily' }
    ]);

    const columns = [
        {
            title: '点检项目',
            dataIndex: 'ItemName',
            key: 'checkProject',
        },
        {
            title: '点检方法',
            dataIndex: 'ItemMethod',
            key: 'checkMethod',
        },
        {
            title: '点检周期',
            dataIndex: 'ItemPeriod',
            key: 'checkPeriod',
            render: (text) => {
                switch (text) {
                    case 'daily':
                        return '日点检';
                    case 'weekly':
                        return '周点检';
                    case 'monthly':
                        return '月点检';
                    case 'yearly':
                        return '年点检';
                    default:
                        return text;
                }
            }
        },
    ];

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleAdd = (values) => {
        const newId = checkItems.length > 0 ? Math.max(...checkItems.map(item => item.id)) + 1 : 1;
        const newItem = {
            id: newId,
            ItemName: values.checkProject,
            ItemMethod: values.checkMethod,
            ItemPeriod: values.checkPeriod,
        };
        setCheckItems([...checkItems, newItem]);
        setVisible(false);
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <TableWithSearch
                extraButton={<Button type="primary" onClick={showModal}>添加点检项</Button>}
                columns={columns}
                dataSource={checkItems}
                pagination={{ pageSize: 10 }}
                rowKey="id"
            />
            <AddCheckItemModal
                visible={visible}
                onCancel={handleCancel}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default CheckItemManagement;
