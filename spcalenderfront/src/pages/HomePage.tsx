import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useEvents } from '@src/hooks/useEvents';
import { IFilters } from '@src/types/events';
import EventFilters from "@components/EventFilters";
import EventsList from "@components/EventsList";

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<IFilters>({
        sportType: '',
        startDate: '',
        location: '',
    });

    const { data: events, isLoading, error } = useEvents(filters);

    return (
        <Box p={2} sx={{ maxWidth: '1200px', margin: 'auto' }}>
            {/* Заголовок */}
            <Box mb={4} textAlign="center">
                <Typography variant="h4" fontWeight="bold">
                    Календарь мероприятий
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Найдите ближайшие спортивные события
                </Typography>
            </Box>

            {/* Фильтры */}
            <EventFilters filters={filters} onFiltersChange={setFilters} />

            {/* Список событий */}
            <EventsList events={events || []} isLoading={isLoading} error={error} />
        </Box>
    );
};

export default HomePage;
