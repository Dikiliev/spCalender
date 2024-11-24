import React from 'react';
import { Box, TextField, MenuItem, Button, Paper, Stack } from '@mui/material';
import { IFilters } from '@src/types/events';

interface EventFiltersProps {
    filters: IFilters;
    onFiltersChange: (filters: IFilters) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ filters, onFiltersChange }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFiltersChange({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        onFiltersChange({
            sport_type: '',
            start_date_after: '',
            start_date_before: '',
            location: '',
            participantsMin: undefined,
            participantsMax: undefined,
            gender: 'mixed',
            ageGroup: '',
            isCancelled: undefined,
            ordering: '',
        });
    };

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Stack spacing={2}>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        label="Вид спорта"
                        select
                        name="sportType"
                        value={filters.sport_type || ''}
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
                        value={filters.start_date_after || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Дата окончания"
                        type="date"
                        name="endDate"
                        value={filters.start_date_before || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        label="Местоположение"
                        name="location"
                        value={filters.location || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        label="Минимум участников"
                        type="number"
                        name="participantsMin"
                        value={filters.participantsMin || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        label="Максимум участников"
                        type="number"
                        name="participantsMax"
                        value={filters.participantsMax || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        label="Пол"
                        select
                        name="gender"
                        value={filters.gender || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: '200px' }}
                    >
                        <MenuItem value="">Любой</MenuItem>
                        <MenuItem value="male">Мужской</MenuItem>
                        <MenuItem value="female">Женский</MenuItem>
                        <MenuItem value="mixed">Смешанный</MenuItem>
                    </TextField>

                    <TextField
                        label="Возрастная группа"
                        name="ageGroup"
                        value={filters.ageGroup || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />
                </Box>

                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        label="Сортировка"
                        select
                        name="ordering"
                        value={filters.ordering || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                        sx={{ minWidth: '200px' }}
                    >
                        <MenuItem value="">По умолчанию</MenuItem>
                        <MenuItem value="start_date">Дата начала</MenuItem>
                        <MenuItem value="-start_date">Дата начала (обратный)</MenuItem>
                        <MenuItem value="participants">Количество участников</MenuItem>
                        <MenuItem value="-participants">Количество участников (обратный)</MenuItem>
                    </TextField>
                </Box>

                <Button variant="contained" onClick={resetFilters}>
                    Сбросить
                </Button>
            </Stack>
        </Paper>
    );
};

export default EventFilters;
