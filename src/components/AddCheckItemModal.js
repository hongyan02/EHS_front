import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const AddCheckItemModal = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            form.resetFields();
            onAdd(values);
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    return (
        <Modal
            title="添加点检项"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <Form
                form={form}
                name="checkItemForm"
            >
                <Form.Item
                    name="checkProject"
                    rules={[{ required: true, message: '请输入点检项目' }]}
                >
                    <Input placeholder="请输入点检项目" />
                </Form.Item>
                <Form.Item
                    name="checkMethod"
                    rules={[{ required: true, message: '请输入点检方法' }]}
                >
                    <Input placeholder="请输入点检方法" />
                </Form.Item>
                <Form.Item
                    name="checkPeriod"
                    rules={[{ required: true, message: '请选择点检周期' }]}
                >
                    <Select placeholder="请选择点检周期">
                        <Option value="daily">日点检</Option>
                        <Option value="weekly">周点检</Option>
                        <Option value="monthly">月点检</Option>
                        <Option value="yearly">年点检</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCheckItemModal;
