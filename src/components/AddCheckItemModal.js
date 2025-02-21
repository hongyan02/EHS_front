import React from 'react';
import { Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const AddCheckItemModal = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formattedData = {
                itemName: values.itemName.trim(),
                checkMethod: values.checkMethod.trim(),
                checkPeriod: values.checkPeriod
            };

            await onAdd(formattedData);
            form.resetFields();
            onCancel();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || '提交失败，请重试';
            message.error(errorMessage);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="添加点检项"
            open={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
            maskClosable={false}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                validateTrigger={['onChange', 'onBlur']}
            >
                <Form.Item
                    name="itemName"
                    label="点检项目"
                    rules={[
                        { required: true, message: '请输入点检项目' },
                        { max: 100, message: '点检项目不能超过100个字符' },
                        { whitespace: true, message: '点检项目不能为空格' }
                    ]}
                >
                    <Input placeholder="请输入点检项目名称" />
                </Form.Item>

                <Form.Item
                    name="checkMethod"
                    label="点检方法"
                    rules={[
                        { required: true, message: '请输入点检方法' },
                        { max: 500, message: '点检方法不能超过500个字符' },
                        { whitespace: true, message: '点检方法不能为空格' }
                    ]}
                >
                    <Input.TextArea 
                        placeholder="请详细描述点检方法"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </Form.Item>

                <Form.Item
                    name="checkPeriod"
                    label="点检周期"
                    rules={[{ required: true, message: '请选择点检周期' }]}
                >
                    <Select placeholder="请选择点检周期">
                        <Option value="Daily">日点检</Option>
                        <Option value="Weekly">周点检</Option>
                        <Option value="Monthly">月点检</Option>
                        <Option value="Yearly">年点检</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCheckItemModal;
