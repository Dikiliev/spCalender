// src/types/events.ts

// Интерфейс для SportType
export interface ISportType {
    id: number;
    name: string;
}

// Интерфейс для Event
export interface IEvent {
    id: number;
    title: string;
    sport_type: ISportType; // Вложенный объект типа SportType
    start_date: string; // ISO-формат даты (YYYY-MM-DDTHH:mm:ssZ)
    end_date: string; // ISO-формат даты
    location: string;
    participants: number; // Количество участников
    gender: 'male' | 'female' | 'mixed'; // Уточненные значения
    age_group: string;
    event_type: string;
    description?: string; // Описание может быть необязательным
    is_cancelled: boolean;
    last_updated: string; // ISO-формат даты обновления
}


export interface IFilters {
    sportType?: string; // Тип спорта
    startDate?: string; // Дата начала (диапазон)
    endDate?: string; // Дата окончания (диапазон)
    location?: string; // Местоположение
    participantsMin?: number; // Минимальное количество участников
    participantsMax?: number; // Максимальное количество участников
    gender?: 'male' | 'female' | 'mixed'; // Пол
    ageGroup?: string; // Возрастная группа
    isCancelled?: boolean; // Отменённые события
    ordering?: string; // Порядок сортировки (start_date, -participants и т.д.)
}
