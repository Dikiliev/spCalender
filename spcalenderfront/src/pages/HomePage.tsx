import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    IconButton,
    Drawer,
    useMediaQuery,
    CircularProgress,
    Grid,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllEvents } from '@src/api/events';
import EventsList from '@components/EventsList';
import { saveToStorage, loadFromStorage } from '@src/utils/storage';
import FiltersPanel from '@components/FiltersPanel';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useInView } from 'react-intersection-observer';
import theme from '@styles/theme';
import {IFilters} from "types/events";

const FILTERS_STORAGE_KEY = 'user_event_filters';

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState(() => {
        return loadFromStorage(FILTERS_STORAGE_KEY) || {
            sport_type: '',
            competition: '',
            start_date_after: '',
            start_date_before: '',
            location: '',
            participantsMin: undefined,
            participantsMax: undefined,
            gender: undefined,
            ageGroup: '',
            isCancelled: undefined,
            ordering: '',
        } as IFilters;
    });

    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { ref, inView } = useInView();

    React.useEffect(() => {
        saveToStorage(FILTERS_STORAGE_KEY, filters);
    }, [filters]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['events', filters],
        queryFn: ({ pageParam = 1 }) => fetchAllEvents(pageParam, filters),
        getNextPageParam: (lastPage) => {
            const nextUrl = lastPage.next;
            if (nextUrl) {
                const urlParams = new URLSearchParams(nextUrl.split('?')[1]);
                return urlParams.get('page') ? parseInt(urlParams.get('page')!) : undefined;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    React.useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const resetFilters = () => {
        setFilters({
            sport_type: '',
            start_date_after: '',
            start_date_before: '',
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

    const events = data?.pages.flatMap((page) => page.results) || [];

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
                    <EventsList events={events} isLoading={isLoading} error={isError ? 'Ошибка загрузки данных.' : null} />
                    <Grid item xs={12} ref={ref} sx={{ textAlign: 'center', mt: 2 }}>
                        {isFetchingNextPage && <CircularProgress />}
                    </Grid>
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
                            bottom: 16,
                            right: 16,
                            zIndex: theme.zIndex.drawer + 1,
                            backgroundColor: 'white',
                            boxShadow: theme.shadows[4],
                            borderRadius: '50%',
                            width: 56,
                            height: 56,
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
