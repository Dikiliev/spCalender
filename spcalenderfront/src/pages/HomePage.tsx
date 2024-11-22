import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Card,
    CardContent,
    Button,
    Stack, Paper,
} from '@mui/material';
import {
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    People as PeopleIcon,
    Sports as SportsIcon,
    Wc as GenderIcon,
    Group as AgeGroupIcon,
} from '@mui/icons-material';
import { useEvents } from '@src/hooks/useEvents';
import { IFilters } from '@src/types/events';

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState<IFilters>({
        sportType: '',
        startDate: '',
        location: '',
    });

    const { events, isLoading, error } = useEvents(filters);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Box p={2} sx={{ maxWidth: '1200px', margin: 'auto' }}>
            {/* Шапка */}
            <Box mb={4} textAlign="center">
                <Typography variant="h4" fontWeight="bold">
                    Календарь мероприятий
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Найдите ближайшие спортивные события
                </Typography>
            </Box>

            {/* Фильтры */}

            <Paper sx={{ p: 2, mb: 2 }}>
                <Box
                    display="flex"
                    gap={2}
                    flexWrap="wrap"
                    alignItems="center"

                    sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                >
                    <TextField
                        label="Вид спорта"
                        select
                        name="sportType"
                        value={filters.sportType}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: '200px' }}
                    >
                        <MenuItem value="">Все виды спорта</MenuItem>
                        <MenuItem value="basketball">Баскетбол</MenuItem>
                        <MenuItem value="swimming">Плавание</MenuItem>
                        <MenuItem value="football">Футбол</MenuItem>
                    </TextField>

                    <TextField
                        label="Дата начала"
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Местоположение"
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />

                    <Button
                        variant="contained"
                        onClick={() => setFilters({ sportType: '', startDate: '', location: '' })}
                    >
                        Сбросить
                    </Button>
                </Box>
            </Paper>

            {/* Контент */}
            <Box>
                {isLoading && <Typography>Загрузка...</Typography>}
                {error && (
                    <Typography color="error">
                        Ошибка при загрузке данных: {error.message}
                    </Typography>
                )}

                {!isLoading && events.length === 0 && (
                    <Typography>Мероприятия не найдены.</Typography>
                )}

                <Grid container spacing={2}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <Typography variant="h6" fontWeight="bold" mb={1}>
                                        {event.title}
                                    </Typography>

                                    <Box>
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <SportsIcon fontSize="small" color="primary" />
                                            <Typography variant="body2" color="textSecondary">
                                                {event.sport_type ? event.sport_type.name : 'Не указан'}
                                            </Typography>
                                        </Stack>

                                        {/* Даты */}
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <CalendarIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">
                                                {new Date(event.start_date).toLocaleDateString()} —{' '}
                                                {new Date(event.end_date).toLocaleDateString()}
                                            </Typography>
                                        </Stack>

                                        {/* Местоположение */}
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <LocationIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">{event.location}</Typography>
                                        </Stack>

                                        {/* Пол участников */}
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <GenderIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">
                                                {event.gender === 'male'
                                                    ? 'Мужской'
                                                    : event.gender === 'female'
                                                        ? 'Женский'
                                                        : 'Смешанный'}
                                            </Typography>
                                        </Stack>

                                        {/* Возрастная группа */}
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <AgeGroupIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">
                                                Возраст {event.age_group || 'Не указана'}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <PeopleIcon fontSize="small" color="primary" />
                                            <Typography variant="body2">
                                                {event.participants} участников
                                            </Typography>
                                        </Stack>


                                    </Box>

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                        fullWidth
                                    >
                                        Подробнее
                                    </Button>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default HomePage;
