import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { checkItemApi } from '../services/checkItemService';

export const useCheckItemManagement = () => {
    const queryClient = useQueryClient();

    // 获取点检项列表的查询
    const { 
        data: checkItems,
        isLoading,
        error 
    } = useQuery({
        queryKey: ['checkItems'],
        queryFn: checkItemApi.getAllCheckItems,
        onError: () => {
            message.error('获取点检项列表失败');
        }
    });

    // 删除点检项的mutation
    const { mutate: deleteCheckItem } = useMutation({
        mutationFn: checkItemApi.deleteCheckItem,
        onSuccess: () => {
            message.success('点检项删除成功');
            queryClient.invalidateQueries({ queryKey: ['checkItems'] });
        },
        onError: () => {
            message.error('点检项删除失败');
        }
    });

    // 添加点检项的mutation
    const { mutate: addCheckItem } = useMutation({
        mutationFn: checkItemApi.addCheckItem,
        onSuccess: () => {
            message.success('点检项添加成功');
            queryClient.invalidateQueries({ queryKey: ['checkItems'] });
        },
        onError: () => {
            message.error('点检项添加失败');
        }
    });

    // 格式化表格数据
    const tableData = checkItems?.map(item => ({
        key: item.id,
        id: item.id,
        ItemName: item.itemName,
        ItemMethod: item.checkMethod,
        ItemPeriod: item.checkPeriod
    })) || [];

    return {
        checkItems: tableData,
        isLoading,
        error,
        deleteCheckItem,
        addCheckItem
    };
};