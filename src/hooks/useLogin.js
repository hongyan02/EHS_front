import { useState } from 'react';
import { loginUser } from '../services/authService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);  // 清空之前的错误信息

    try {
      const data = await loginUser(username, password);
      setLoading(false);
      return data;  // 返回数据供 LoginForm 使用
    } catch (error) {
      setLoading(false);
      setError(error.message);  // 设置错误信息
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
