import React from 'react';
import { Box, TextField, MenuItem, Button, Paper } from '@mui/material';
import { IFilters } from '@src/types/events';

interface EventFiltersProps {
    filters: IFilters;
    onFiltersChange: (filters: IFilters) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ filters, onFiltersChange }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFiltersChange({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        onFiltersChange({ sportType: '', startDate: '', location: '' });
    };

    return (
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

                <Button variant="contained" onClick={resetFilters}>
                    Сбросить
                </Button>
            </Box>
        </Paper>
    );
};

export default EventFilters;
