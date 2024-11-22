// src/api/events.ts
import { IEvent, IFilters } from '@src/types/events';
import apiInstance from '@src/api/apiInstance';

// Получение списка мероприятий
export const fetchEvents = async (filters: IFilters): Promise<IEvent[]> => {
    try {
        const sanitizedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        );

        const { data } = await apiInstance.get<IEvent[]>('/events/list', { params: sanitizedFilters });
        return data;
    } catch (error) {
        console.error('Ошибка при запросе мероприятий:', error);
        throw error; // Позволяет React Query обработать ошибку
    }
};

