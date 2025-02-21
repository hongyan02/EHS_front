const BASE_URL = 'http://localhost:8080/api/check-items';

export const checkItemApi = {
  // 获取所有点检项
  getAllCheckItems: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('获取点检项列表失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('获取点检项列表错误:', error);
      throw error;
    }
  },

  // 获取单个点检项
  getCheckItem: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('获取点检项详情失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('获取点检项详情错误:', error);
      throw error;
    }
  },

  // 添加新点检项
  addCheckItem: async (checkItemData) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          itemName: checkItemData.itemName,
          checkMethod: checkItemData.checkMethod,
          checkPeriod: checkItemData.checkPeriod,
          status: checkItemData.status || 'active'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || '添加点检项失败');
      }

      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message || '添加点检项失败');
      }
    } catch (error) {
      console.error('添加点检项错误:', error);
      throw error;
    }
  },

  // 更新点检项
  updateCheckItem: async (id, checkItemData) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkItemData),
      });
      if (!response.ok) {
        throw new Error('更新点检项失败');
      }
      const result = await response.json();
      if (result.code === 200) {
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('更新点检项错误:', error);
      throw error;
    }
  },

  // 删除点检项
  deleteCheckItem: async (checkItemId) => {
    try {
      const response = await fetch(`${BASE_URL}/${checkItemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('删除点检项失败');
      }
      return true;
    } catch (error) {
      console.error('删除点检项错误:', error);
      throw error;
    }
  }
};