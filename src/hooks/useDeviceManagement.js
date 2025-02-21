import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { deviceApi } from '../services/deviceService';

export const useDeviceManagement = () => {
    const queryClient = useQueryClient();

    // 获取设备列表的查询
    const { 
        data: devices,
        isLoading,
        error 
    } = useQuery({
        queryKey: ['devices'],
        queryFn: deviceApi.getAllDevices,
        onError: () => {
            message.error('获取设备列表失败');
        }
    });

    // 删除设备的mutation
    const { mutate: deleteDevice } = useMutation({
        mutationFn: deviceApi.deleteDevice,
        onSuccess: () => {
            message.success('设备删除成功');
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
        onError: () => {
            message.error('设备删除失败');
        }
    });

    // 添加设备的mutation
    const { mutate: addDevice } = useMutation({
        mutationFn: deviceApi.addDevice,
        onSuccess: () => {
            message.success('设备添加成功');
            queryClient.invalidateQueries({ queryKey: ['devices'] });
        },
        onError: () => {
            message.error('设备添加失败');
        }
    });

    // 格式化表格数据
    const tableData = devices?.map(device => ({
        key: device.deviceId,
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        deviceLocaltion: device.location,
        addTime: device.addTime
    })) || [];

    return {
        devices: tableData,
        isLoading,
        error,
        deleteDevice,
        addDevice
    };
}; 