import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    IconButton,
    Drawer,
    useMediaQuery,
    Button,
} from '@mui/material';
import { useEvents } from '@src/hooks/useEvents';
import { IFilters } from '@src/types/events';
import EventsList from '@components/EventsList';
import { saveToStorage, loadFromStorage } from '@src/utils/storage';
import FiltersPanel from '@components/FiltersPanel';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@styles/theme';

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

    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const toggleFilters = () => {
        setFiltersOpen(!isFiltersOpen);
    };

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', mt: 4 }}>
            {/* Контентная область */}
            <Box flex="1">
                <Box>
                    <Paper sx={{ p: 4, mb: 2 }}>
                        <Typography variant="h4" fontWeight="bold">
                            Календарь спортивных мероприятий
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Найдите ближайшие спортивные события
                        </Typography>
                    </Paper>

                    {/* Список событий */}
                    <EventsList events={events || []} isLoading={isLoading} error={error} />
                </Box>
            </Box>

            {/* Боковая панель фильтров */}
            {!isMobile ? (
                <FiltersPanel onApplyFilters={setFilters} onResetFilters={resetFilters} />
            ) : (
                <>
                    <IconButton
                        color="primary"
                        onClick={toggleFilters}
                        sx={{
                            position: 'fixed',
                            bottom: 16, // Расстояние от нижнего края
                            right: 16, // Расстояние от правого края
                            zIndex: theme.zIndex.drawer + 1,
                            backgroundColor: 'white',
                            boxShadow: theme.shadows[4],
                            borderRadius: '50%', // Круглая форма
                            width: 56, // Размер кнопки
                            height: 56, // Размер кнопки
                        }}
                    >
                        <FilterListIcon fontSize="large" />
                    </IconButton>


                    <Drawer
                        anchor="right"
                        open={isFiltersOpen}
                        onClose={toggleFilters}
                        PaperProps={{ sx: { width: '80vw' } }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                            <Typography variant="h6">Фильтры</Typography>
                            <IconButton onClick={toggleFilters}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <FiltersPanel onApplyFilters={setFilters} onResetFilters={resetFilters} />
                    </Drawer>
                </>
            )}
        </Container>
    );
};

export default HomePage;
