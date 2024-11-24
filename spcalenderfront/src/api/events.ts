import {ICompetitionType, IEvent, IFilters, ISportType} from '@src/types/events';
import apiInstance from '@src/api/apiInstance';
import {PaginatedResponse} from "types/common";

export const fetchEvents = async (filters: Partial<IFilters>): Promise<IEvent[]> => {
    try {
        const sanitizedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        );

        const { data } = await apiInstance.get<IEvent[]>('/events/list', {
            params: sanitizedFilters,
        });

        return data;
    } catch (error) {
        console.error('Ошибка при запросе событий:', error);
        throw error;
    }
};


export const fetchAllEvents = async (page: number, filters: IFilters): Promise<PaginatedResponse<IEvent>> => {
    const params = new URLSearchParams({ page: page.toString() });

    console.log(filters);

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            if (key === 'participantsMin') {
                params.append('participants_after', value.toString());
            } else if (key === 'participantsMax') {
                params.append('participants_before', value.toString());
            } else if (Array.isArray(value)) {
                // Если это массив, отправляем элементы через запятую
                params.append(key, value.join(','));
            } else {
                params.append(key, value as string);
            }
        }
    });

    try {
        const response = await apiInstance.get(`/events/list/?${params.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Failed to fetch events');
    }
};


export const fetchSportTypes = async (): Promise<ISportType[]> => {
    const response = await apiInstance.get('/events/sport-types/');
    return response.data;
};

export const fetchCompetitions = async (): Promise<ICompetitionType[]> => {
    const response = await apiInstance.get('/events/competitions/');
    console.log(response.data);
    return response.data;
};