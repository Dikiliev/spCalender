import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '@src/api/events';
import { IEvent, IFilters } from '@src/types/events';

export const useEvents = (filters: IFilters) => {
    // Убедитесь, что пустые значения фильтров исключены
    const sanitizedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    ) as IFilters;

    const queryKey = ['events', sanitizedFilters];

    const {
        data,
        error,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<IEvent[], Error>({
        queryKey,
        queryFn: () => fetchEvents(sanitizedFilters),
        keepPreviousData: true,
    });

    return {
        events: data || [],
        isLoading,
        isError,
        isSuccess,
        error,
    };
};
