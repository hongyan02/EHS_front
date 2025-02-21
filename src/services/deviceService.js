const BASE_URL = 'http://localhost:8080/api/devices';

export const deviceApi = {
  // 获取所有设备
  getAllDevices: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('获取设备列表失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;  // 返回真实数据
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('获取设备列表错误:', error);
      throw error;
    }
  },

  // 根据ID获取设备
  getDeviceById: async (deviceId) => {
    try {
      const response = await fetch(`${BASE_URL}/${deviceId}`);
      if (!response.ok) {
        throw new Error('获取设备详情失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('获取设备详情错误:', error);
      throw error;
    }
  },

  // 添加新设备
  addDevice: async (deviceData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData),
      });
      if (!response.ok) {
        throw new Error('添加设备失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('添加设备错误:', error);
      throw error;
    }
  },

  // 删除设备
  deleteDevice: async (deviceId) => {
    try {
      const response = await fetch(`${BASE_URL}/${deviceId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('删除设备失败');
      }
      const result = await response.json();
      if (result.code !== 200) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('删除设备错误:', error);
      throw error;
    }
  },
};