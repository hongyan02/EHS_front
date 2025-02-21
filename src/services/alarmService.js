const BASE_URL = 'http://localhost:8080/api';

export const alarmApi = {
  // 获取所有活跃报警
  getActiveAlarms: async () => {
    try {
      const response = await fetch(`${BASE_URL}/alarms/active`);
      if (!response.ok) {
        throw new Error('获取活跃报警列表失败');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('获取活跃报警列表错误:', error);
      throw error;
    }
  },

  // 创建新的报警信息
  createAlarm: async (alarmData) => {
    try {
      const response = await fetch(`${BASE_URL}/alarms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alarmData),
      });
      if (!response.ok) {
        throw new Error('创建报警失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('创建报警错误:', error);
      throw error;
    }
  },

  // 更新报警状态
  updateAlarmStatus: async (alarmId, statusData) => {
    try {
      const response = await fetch(`${BASE_URL}/alarms/${alarmId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusData),
      });
      if (!response.ok) {
        throw new Error('更新报警状态失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('更新报警状态错误:', error);
      throw error;
    }
  },
};