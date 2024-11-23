export interface ISportType {
    id: number;
    name: string;
}

export interface IEvent {
    id: number;
    title: string;
    sport_type: ISportType;
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
    sportType?: string;
    startDate?: string;
    endDate?: string;
    country?: string;
    region?: string;
    city?: string;
    location?: string;
    participantsMin?: number;
    participantsMax?: number;
    gender?: 'male' | 'female' | 'mixed';
    ageGroup?: string;
    isCancelled?: boolean;
    ordering?: string;
    duration?: number;
}
