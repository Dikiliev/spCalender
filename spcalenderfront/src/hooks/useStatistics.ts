import { useQuery } from '@tanstack/react-query';
import { fetchEventStatistics } from '@src/api/statistics';

export const useStatistics = (city: string, sportType: string) => {
    return useQuery({
        queryKey: ['statistics', city, sportType],
        queryFn: () => fetchEventStatistics(city, sportType),
        staleTime: 5 * 60 * 1000, // Данные считаются актуальными 5 минут
        refetchOnWindowFocus: false, // Не перезагружать данные при фокусе окна
    });
};
