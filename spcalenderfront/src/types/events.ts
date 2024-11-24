export interface ISportType {
    id: number;
    name: string;
}

export interface ICompetitionType {
    id: number;
    name: string;
}

export interface IEvent {
    id: number;
    title: string;
    sport_type: ISportType;
    competition: ICompetitionType;
    start_date: string;
    end_date: string;
    country: string;
    region: string;
    city: string;
    location: string;
    participants: number;
    gender: 'male' | 'female' | 'mixed';
    age_group: string;
    event_type: string;
    description?: string;
    program?: string;
    is_cancelled: boolean;
    last_updated: string;
}

export interface IFilters {
    sportType?: string[]; // Изменено на массив
    competition?: string[]; // Изменено на массив
    startDate?: string; // ISO-формат даты
    endDate?: string; // ISO-формат даты
    country?: string;
    region?: string;
    city?: string;
    location?: string;
    participantsMin?: number;
    participantsMax?: number;
    gender?: 'male' | 'female' | 'mixed';
    ageGroup?: string;
    isCancelled?: boolean;
    ordering?: string; // Поле сортировки
}
