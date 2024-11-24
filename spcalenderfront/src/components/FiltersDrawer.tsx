import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Divider,
    Stack,
} from '@mui/material';
import { IFilters } from '@src/types/events';

interface FiltersDrawerProps {
    open: boolean;
    onClose: () => void;
    filters: IFilters;
    onFiltersChange: (filters: IFilters) => void;
    onResetFilters: () => void;
}

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
                                                         open,
                                                         onClose,
                                                         filters,
                                                         onFiltersChange,
                                                         onResetFilters,
                                                     }) => {
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onFiltersChange({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box p={2} sx={{ width: 300 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Фильтры
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        label="Вид спорта"
                        select
                        name="sportType"
                        value={filters.sport_type || ''}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
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

                    <Divider />

                    <Button variant="contained" onClick={onResetFilters} fullWidth>
                        Сбросить
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default FiltersDrawer;
