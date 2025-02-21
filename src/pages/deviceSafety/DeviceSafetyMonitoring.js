import React from 'react';
import { Typography, Row, Badge, message } from 'antd';
import { useDeviceSafetyMonitoring } from '../../hooks/useDeviceSafetyMonitoring';
import AlarmCard from '../../components/AlarmCard';

const { Title } = Typography;

const DeviceSafetyMonitoring = () => {
  const { alarms, connectionStatus, confirmAlarm } = useDeviceSafetyMonitoring();
  const getStatusBadge = () => {
    switch(connectionStatus) {
      case 'connecting':
        return <Badge status="processing" text="正在连接..." />;
      case 'connected':
        return <Badge status="success" text="已连接" />;
      case 'disconnected':
        return <Badge status="error" text="连接断开" />;
      default:
        return null;
    }
  };
  const handleConfirmAlarm = async (alarmId) => {
    try {
      await confirmAlarm(alarmId);
      message.success('报警确认成功');
    } catch (error) {
      message.error('报警确认失败：' + error.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ color: '#1890ff', margin: 0 }}>
          设备安全监测
        </Title>
        {getStatusBadge()}
      </div>
      <Row gutter={[16, 16]}>
        {Object.values(alarms).map((alarm) => (
          <AlarmCard key={alarm.id} alarm={alarm} onConfirm={handleConfirmAlarm} />
        ))}
      </Row>
    </div>
  );
};

export default DeviceSafetyMonitoring;