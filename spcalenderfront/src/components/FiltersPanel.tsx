import React, { useState } from 'react';
import { Typography, TextField, MenuItem, Button, Stack, Paper } from '@mui/material';
import { IFilters } from '@src/types/events';

interface FiltersPanelProps {
    onApplyFilters: (filters: IFilters) => void; // Применение фильтров
    onResetFilters: () => void; // Сброс фильтров
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ onApplyFilters, onResetFilters }) => {
    const [localFilters, setLocalFilters] = useState({
        sportType: '',
        location: '',
        participantsMin: '',
        participantsMax: '',
        gender: '',
        ageGroup: '',
        period: '', // Локальное поле для выбора периода
        duration: '', // Локальное поле для выбора длительности
        customDuration: '', // Локальное поле для кастомной длительности
        startDate: '', // Локальное поле для расчёта дат
        endDate: '', // Локальное поле для расчёта дат
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'period') {
            calculateDatesFromPeriod(value);
        }
    };

    const calculateDatesFromPeriod = (period: string) => {
        const today = new Date();
        let startDate = '';
        let endDate = '';

        if (period === 'today') {
            startDate = today.toISOString().split('T')[0];
            endDate = startDate;
        } else if (period === 'tomorrow') {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            startDate = tomorrow.toISOString().split('T')[0];
            endDate = startDate;
        } else if (period === 'week') {
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            startDate = today.toISOString().split('T')[0];
            endDate = nextWeek.toISOString().split('T')[0];
        }

        setLocalFilters((prev) => ({
            ...prev,
            startDate,
            endDate,
        }));
    };

    const transformFilters = (): IFilters => {
        const { duration, customDuration, ...serverFilters } = localFilters;

        // Преобразование участников в числа
        const participantsMin = localFilters.participantsMin
            ? parseInt(localFilters.participantsMin, 10)
            : undefined;
        const participantsMax = localFilters.participantsMax
            ? parseInt(localFilters.participantsMax, 10)
            : undefined;

        // Преобразование длительности
        if (duration === 'custom' && customDuration) {
            const days = Number(customDuration);
            if (localFilters.startDate) {
                const endDate = new Date(
                    new Date(localFilters.startDate).getTime() + days * 24 * 60 * 60 * 1000
                )
                    .toISOString()
                    .split('T')[0];
                serverFilters.endDate = endDate;
            }
        }

        return {
            ...serverFilters,
            participantsMin,
            participantsMax,
        } as IFilters;
    };

    const handleApplyFilters = () => {
        const filtersForServer = transformFilters();
        onApplyFilters(filtersForServer); // Отправляем только нужные данные
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width: 300,
                p: 2,
                ml: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h6" fontWeight="bold">
                Фильтры
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Вид спорта"
                    select
                    name="sportType"
                    value={localFilters.sportType}
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
                    label="Период"
                    select
                    name="period"
                    value={localFilters.period}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Выберите период</MenuItem>
                    <MenuItem value="today">Сегодня</MenuItem>
                    <MenuItem value="tomorrow">Завтра</MenuItem>
                    <MenuItem value="week">Текущая неделя</MenuItem>
                </TextField>

                <TextField
                    label="Длительность"
                    select
                    name="duration"
                    value={localFilters.duration}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Выберите длительность</MenuItem>
                    <MenuItem value="1">1 день</MenuItem>
                    <MenuItem value="3">3 дня</MenuItem>
                    <MenuItem value="7">Неделя</MenuItem>
                    <MenuItem value="30">Месяц</MenuItem>
                    <MenuItem value="custom">Другое</MenuItem>
                </TextField>

                {localFilters.duration === 'custom' && (
                    <TextField
                        label="Длительность (в днях)"
                        type="number"
                        name="customDuration"
                        value={localFilters.customDuration}
                        onChange={handleFilterChange}
                        variant="outlined"
                        size="small"
                    />
                )}

                <TextField
                    label="Минимум участников"
                    type="number"
                    name="participantsMin"
                    value={localFilters.participantsMin}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />

                <TextField
                    label="Максимум участников"
                    type="number"
                    name="participantsMax"
                    value={localFilters.participantsMax}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />

                <Button variant="contained" onClick={handleApplyFilters} fullWidth>
                    Применить
                </Button>
                <Button variant="outlined" onClick={onResetFilters} fullWidth>
                    Сбросить
                </Button>
            </Stack>
        </Paper>
    );
};

export default FiltersPanel;
