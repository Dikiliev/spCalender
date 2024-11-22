import { IEvent, IFilters } from '@src/types/events';
import apiInstance from '@src/api/apiInstance';

// Получение списка мероприятий
export const fetchEvents = async (filters: Partial<IFilters>): Promise<IEvent[]> => {
    try {
        // Убедитесь, что фильтры очищены на уровне вызова функции
        const sanitizedFilters: Record<string, string | undefined> = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        );

        // Запрос к API
        const { data } = await apiInstance.get<IEvent[]>('/events/list', { params: sanitizedFilters });
        return data;
    } catch (error) {
        console.error('Ошибка при запросе мероприятий:', error);
        throw error; // React Query обработает это
    }
};
