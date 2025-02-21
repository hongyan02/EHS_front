export const deviceColumns = [
    { 
        title: '设备ID', 
        dataIndex: 'deviceId', 
        key: 'deviceId' 
    },
    { 
        title: '设备名称', 
        dataIndex: 'deviceName', 
        key: 'deviceName' 
    },
    { 
        title: '车间位置', 
        dataIndex: 'deviceLocaltion', 
        key: 'deviceLocaltion' 
    },
    {
        title: '添加时间',
        dataIndex: 'addTime',
        key: 'addTime',
        render: (text) => new Date(text).toLocaleString(),
    },
]; 