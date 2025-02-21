import React from 'react';
import { Card, Badge, Space, Col, Button } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const AlarmCard = ({ alarm, onConfirm }) => {
  // 格式化时间显示
  const formatDateTime = (timestamp) => {
    try {
      if (!timestamp) return '未知时间';
      const date = dayjs(timestamp);
      if (!date.isValid()) {
        console.error('无效的时间格式:', timestamp);
        return '时间格式错误';
      }
      return date.locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
      console.error('时间格式化错误:', error, 'timestamp:', timestamp);
      return '时间格式错误';
    }
  };

 return (
    <Col xs={24} sm={12} md={6} lg={6} key={alarm.id}>
      <Badge.Ribbon 
        text={alarm.isEnded ? '已结束' : '进行中'}
        color={alarm.isEnded ? 'green' : 'red'}
      >
        <Card
          size="small"
          style={{ 
            width: '100%',
            opacity: alarm.isEnded ? 0.7 : 1
          }}
          bodyStyle={{ padding: '8px 12px' }}
          actions={[!alarm.isEnded && !alarm.isConfirmed && (
            <Button type="primary" size="small" onClick={() => onConfirm(alarm.id)}>
              确认报警
            </Button>
          )].filter(Boolean)}
        >
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Space size="small">
              <strong>{alarm.deviceName}</strong>
              <Badge status={alarm.isEnded ? 'success' : 'error'} />
            </Space>
            <div style={{ margin: '0', lineHeight: '1.3' }}><strong>报警类型：</strong>{alarm.alarmType}</div>
            <div style={{ margin: '0', lineHeight: '1.3' }}><strong>报警时间：</strong>{formatDateTime(alarm.timestamp)}</div>
            <div style={{ margin: '0', lineHeight: '1.3' }}><strong>报警描述：</strong>{alarm.alarmName}</div>
            {alarm.isConfirmed && (
              <div style={{ margin: '0', lineHeight: '1.3' }}><strong>确认时间：</strong>{formatDateTime(alarm.confirmTime)}</div>
            )}
            {alarm.isEnded && (
              <div style={{ margin: '0', lineHeight: '1.3' }}><strong>结束时间：</strong>{formatDateTime(alarm.endTime)}</div>
            )}
          </Space>
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

export default AlarmCard;