import { apiInstance } from '@api/index';

// Интерфейс для структуры ответа от API
export interface EventDataByDays {
    day: string;
    events: number;
}

export interface ParticipantData {
    sport: string;
    participants: number;
}

export interface TopEventsByCount {
    sport: string;
    events: number;
}

export interface AgeData {
    age: string;
    count: number;
}

export interface StatisticsResponse {
    eventDataByDays: EventDataByDays[];
    topEventsByCount: TopEventsByCount[];
    topEventsByParticipants: ParticipantData[];
    ageData: AgeData[];
}

// Типизация параметров запроса
export interface FetchStatisticsParams {
    city: string;
    sportType: string;
}

// Функция для запроса статистики
export const fetchEventStatistics = async ({
                                               city,
                                               sportType,
                                           }: FetchStatisticsParams): Promise<StatisticsResponse> => {
    try {
        const response = await apiInstance.get<StatisticsResponse>('/events/statistics/', {
            params: { city, sportType },
        });

        console.log('Statistics Response:', response.data);

        return response.data;
    } catch (error: unknown) {
        console.error('Failed to fetch statistics:', error);

        // Перебрасываем ошибку выше, чтобы она обрабатывалась на уровне вызова
        throw new Error('Ошибка при загрузке статистики. Проверьте параметры и соединение с сервером.');
    }
};
