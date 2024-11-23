import React, { useState } from 'react';
import {Box, Container, Paper, Typography} from '@mui/material';
import { useEvents } from '@src/hooks/useEvents';
import { IFilters } from '@src/types/events';
import EventsList from '@components/EventsList';
import { saveToStorage, loadFromStorage } from '@src/utils/storage';
import FiltersPanel from "@components/FiltersPanel";

const FILTERS_STORAGE_KEY = 'user_event_filters';

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<IFilters>(() => {
        return loadFromStorage<IFilters>(FILTERS_STORAGE_KEY) || {
            sportType: '',
            startDate: '',
            endDate: '',
            location: '',
            participantsMin: undefined,
            participantsMax: undefined,
            gender: undefined,
            ageGroup: '',
            isCancelled: undefined,
            ordering: '',
        };
    });

    React.useEffect(() => {
        saveToStorage(FILTERS_STORAGE_KEY, filters);
    }, [filters]);

    const { data: events, isLoading, error } = useEvents(filters);

    const resetFilters = () => {
        setFilters({
            sportType: '',
            startDate: '',
            endDate: '',
            location: '',
            participantsMin: undefined,
            participantsMax: undefined,
            gender: undefined,
            ageGroup: '',
            isCancelled: undefined,
            ordering: '',
        });
    };

    return (
        <Container maxWidth='xl' sx={{ display: 'flex', mt: 4 }}>
            {/* Контентная область */}
            <Box flex="1">
                <Paper elevation={3} sx={{ p: 2 }}>
                    <Box mb={4}>
                        <Typography variant="h4" fontWeight="bold">
                            Календарь мероприятий
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Найдите ближайшие спортивные события
                        </Typography>
                    </Box>

                    {/* Список событий */}
                    <EventsList events={events || []} isLoading={isLoading} error={error} />
                </Paper>
            </Box>

            {/* Боковая панель фильтров */}
            <FiltersPanel
                onApplyFilters={setFilters}
                onResetFilters={resetFilters}
             />
        </Container>
    );
};

export default HomePage;