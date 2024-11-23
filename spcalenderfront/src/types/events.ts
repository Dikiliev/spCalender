// Интерфейс для SportType
export interface ISportType {
    id: number;
    name: string;
}

// Интерфейс для Event
export interface IEvent {
    id: number;
    title: string;
    sport_type: ISportType;
    start_date: string;
    end_date: string;
    location: string;
    participants: number;
    gender: 'male' | 'female' | 'mixed';
    age_group: string;
    event_type: string;
    description?: string;
    is_cancelled: boolean;
    last_updated: string;
}

export interface IFilters {
    sportType?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    participantsMin?: number;
    participantsMax?: number;
    gender?: 'male' | 'female' | 'mixed';
    ageGroup?: string;
    isCancelled?: boolean;
    ordering?: string;
    duration?: number;
}
