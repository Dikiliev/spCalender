import apiInstance from '@src/api/apiInstance';
import { INotification, ICreateNotification } from '@src/types/notifications';
import {rootStore} from "@src/stores";

// Получение списка уведомлений
export const getNotifications = async (): Promise<INotification[]> => {
    const { data } = await apiInstance.get('/notifications/list/');
    return data;
};

// Создание уведомления
export const createNotification = async (notification: ICreateNotification): Promise<INotification> => {
    const userId = rootStore.authStore.user?.user_id;

    if (!userId) {
        throw new Error('Пользователь не авторизован');
    }

    const { data } = await apiInstance.post('/notifications/list/', {...notification, user: userId});
    return data;
};

// Обновление уведомления
export const updateNotification = async (id: number, updates: Partial<ICreateNotification>): Promise<INotification> => {
    const { data } = await apiInstance.patch(`/notifications/list/${id}/`, updates);
    return data;
};

// Удаление уведомления
export const deleteNotification = async (id: number): Promise<void> => {
    await apiInstance.delete(`/notifications/${id}/`);
};
