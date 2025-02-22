import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { alarmApi } from '../services/alarmService';

export const useDeviceSafetyMonitoring = () => {
  const [alarms, setAlarms] = useState({});
  const [stompClient, setStompClient] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    // 获取初始活跃报警列表
    const fetchActiveAlarms = async () => {
      try {
        const activeAlarms = await alarmApi.getActiveAlarms();
        const alarmsMap = {};
        activeAlarms.filter(alarm => !alarm.isEnded).forEach(alarm => {
          alarmsMap[alarm.id] = { ...alarm };
        });
        setAlarms(alarmsMap);
      } catch (error) {
        console.error('获取活跃报警列表失败:', error);
      }
    };
    fetchActiveAlarms();
    // 创建WebSocket连接
    const sock = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => sock,
      onConnect: () => {
        console.log('WebSocket连接成功');
        setConnectionStatus('connected');
        
        // 订阅报警信息更新
        client.subscribe('/topic/alarms', (message) => {
          const alarmInfo = JSON.parse(message.body);
          setAlarms(prev => ({
            ...prev,
            [alarmInfo.id]: { ...alarmInfo, isEnded: false }
          }));
        });

        // 订阅报警状态变化
        client.subscribe('/topic/alarm-status', (message) => {
          const { alarmId, ended } = JSON.parse(message.body);
          setAlarms(prev => {
            // 如果报警已结束，直接从状态中移除
            if (ended) {
              const { [alarmId]: removedAlarm, ...remainingAlarms } = prev;
              return remainingAlarms;
            }
            // 只有未结束的报警才更新状态
            if (prev[alarmId] && !prev[alarmId].isEnded) {
              return {
                ...prev,
                [alarmId]: { ...prev[alarmId], isEnded: ended }
              };
            }
            return prev;
          });
        });
      },
      onDisconnect: () => {
        console.log('WebSocket连接断开');
        setConnectionStatus('disconnected');
      },
      onError: (error) => {
        console.error('WebSocket错误:', error);
      }
    });

    client.activate();
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const confirmAlarm = async (alarmId) => {
    try {
      await alarmApi.confirmAlarmEnd(alarmId);
      setAlarms(prev => {
        const { [alarmId]: removedAlarm, ...remainingAlarms } = prev;
        return remainingAlarms;
      });
    } catch (error) {
      console.error('确认报警结束失败:', error);
      throw error;
    }
  };

  return {
    alarms,
    connectionStatus,
    confirmAlarm
  };
};