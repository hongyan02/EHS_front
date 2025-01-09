import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, ToolOutlined, DesktopOutlined, CheckCircleOutlined, WarningOutlined, SafetyCertificateOutlined, AlertOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // 管理折叠状态
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径设置选中的菜单项
  const getSelectedKey = () => {
    const pathname = location.pathname;
    if (pathname === '/' || pathname === '/welcome') return '/welcome';
    if (pathname.includes('/device-safety/devices')) return '/device-safety/devices';
    if (pathname.includes('/device-safety/check-items')) return '/device-safety/check-items';
    if (pathname.includes('/device-safety/monitoring')) return '/device-safety/monitoring';
    if (pathname === '/risks') return '/risks';
    if (pathname === '/hazards') return '/hazards';
    return '/welcome';
  };

  const items = [
    {
      key: '/HomePage',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: 'device-safety',
      icon: <ToolOutlined />,
      label: '设备安全管理',
      children: [
        {
          key: '/device-safety/devices',
          icon: <DesktopOutlined />,
          label: '设备管理',
        },
        {
          key: '/device-safety/check-items',
          icon: <CheckCircleOutlined />,
          label: '点检项管理',
        },
        {
          key: '/device-safety/monitoring',
          icon: <SafetyCertificateOutlined />,
          label: '安全装置监测',
        },
      ]
    },
    {
      key: '/risks',
      icon: <WarningOutlined />,
      label: '危险源管理',
    },
    {
      key: '/hazards',
      icon: <AlertOutlined />,
      label: '隐患排查',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          padding:'0',
        }}
      >
        {/* 折叠按钮 */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
        <div style={{ color: 'black', fontSize: '30px' }}>EHS</div>
      </Header>

      <Layout style={{ flex: 1 }}>
        <Sider
          width={250}
          collapsed={collapsed} // 控制菜单折叠
          onCollapse={(collapsed) => setCollapsed(collapsed)} // 监听折叠状态
          style={{ backgroundColor: '#fff', transition: '0.3s' }}
        >
          <Menu 
            mode="inline" 
            selectedKeys={[getSelectedKey()]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Sider>

        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer style={{ 
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '20px 0',
        position: 'relative'
      }}>
        EHS ©2024 Created by 8BU Digital Department
      </Footer>
    </Layout>
  );
};

export default AppLayout;
