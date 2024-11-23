import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { fetchEvents } from '@src/api/events';
import { IEvent, IFilters } from '@src/types/events';

export const useEvents = (filters: IFilters): UseQueryResult<IEvent[], Error> => {
    const sanitizedFilters: Partial<IFilters> = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    ) as Partial<IFilters>;

    const queryKey = ['events', JSON.stringify(sanitizedFilters)];

    console.log(sanitizedFilters);

    const options: UseQueryOptions<IEvent[], Error, IEvent[]> = {
        queryKey,
        queryFn: () => fetchEvents(sanitizedFilters),
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    };

    const queryResult = useQuery<IEvent[], Error>(options);

    return queryResult;
};
