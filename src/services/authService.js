export const loginUser = async (username, password) => {
    const url = '/api/login'; 
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        // 处理响应错误
        throw new Error('登录失败');
      }
  
      const data = await response.json(); // 假设后端返回的数据是 JSON 格式
  
      return data; // 返回登录成功的数据
    } catch (error) {
      // 捕获错误
      throw new Error(error.message || '登录发生异常');
    }
  };
  