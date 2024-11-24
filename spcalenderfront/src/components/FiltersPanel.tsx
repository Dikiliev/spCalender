import React, { useState, useEffect } from 'react';
import {
    Typography,
    TextField,
    MenuItem,
    Button,
    Stack,
    Paper,
    CircularProgress,
} from '@mui/material';
import { fetchSportTypes, fetchCompetitions } from '@api/events';
import {ICompetitionType, IFilters, ISportType} from "types/events";
import SortBy from "@components/SortBy";
import ParticipantsFilter from "@components/ParticipantsFilter";

interface FiltersPanelProps {
    onApplyFilters: (filters: IFilters) => void;
    onResetFilters: () => void;
}


const FiltersPanel: React.FC<FiltersPanelProps> = ({ onApplyFilters, onResetFilters }) => {
    const [localFilters, setLocalFilters] = useState({
        sport_type: '',
        competition: '',
        location: '',
        participantsMin: '',
        participantsMax: '',
        gender: '',
        ageGroup: '',
        period: '',
        duration: '',
        customDuration: '',
        start_date_after: '',
        start_date_before: '',
        ordering: '',
    });

    const [sportTypes, setSportTypes] = useState<ISportType[]>([]);
    const [competitions, setCompetitions] = useState<ICompetitionType[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const sportTypeData = await fetchSportTypes(); // Fetch спорт-типы
                const competitionData = await fetchCompetitions(); // Fetch соревнования
                setSportTypes(sportTypeData); // Устанавливаем список спорт-типов
                setCompetitions(competitionData); // Устанавливаем список соревнований
            } catch (error) {
                console.error('Error loading filters:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFilters();
    }, []);

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
        } else if (period === 'month') {
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            startDate = firstDayOfMonth.toISOString().split('T')[0];
            endDate = lastDayOfMonth.toISOString().split('T')[0];
        } else if (period === 'quarter') {
            const currentMonth = today.getMonth();
            const startMonth = currentMonth - (currentMonth % 3);
            const firstDayOfQuarter = new Date(today.getFullYear(), startMonth, 1);
            const lastDayOfQuarter = new Date(today.getFullYear(), startMonth + 3, 0);
            startDate = firstDayOfQuarter.toISOString().split('T')[0];
            endDate = lastDayOfQuarter.toISOString().split('T')[0];
        } else if (period === 'halfyear') {
            const currentMonth = today.getMonth();
            const startMonth = currentMonth < 6 ? 0 : 6;
            const firstDayOfHalfYear = new Date(today.getFullYear(), startMonth, 1);
            const lastDayOfHalfYear = new Date(today.getFullYear(), startMonth + 6, 0);
            startDate = firstDayOfHalfYear.toISOString().split('T')[0];
            endDate = lastDayOfHalfYear.toISOString().split('T')[0];
        }

        setLocalFilters((prev) => ({
            ...prev,
            start_date_after: startDate,
            start_date_before: endDate,
        }));
    };


    const transformFilters = (): IFilters => {
        const { duration, customDuration, ...serverFilters } = localFilters;

        const participantsMin = localFilters.participantsMin
            ? parseInt(localFilters.participantsMin, 10)
            : undefined;
        const participantsMax = localFilters.participantsMax
            ? parseInt(localFilters.participantsMax, 10)
            : undefined;

        // Преобразование длительности
        if (duration === 'custom' && customDuration) {
            const days = Number(customDuration);
            if (localFilters.start_date_after) {
                const endDate = new Date(
                    new Date(localFilters.start_date_after).getTime() + days * 24 * 60 * 60 * 1000
                )
                    .toISOString()
                    .split('T')[0];
                serverFilters.start_date_before = endDate;
            }
        }

        return {
            ...serverFilters,
            participantsMin,
            participantsMax,
        } as IFilters;
    };



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

    const handleApplyFilters = () => {
        const filtersForServer = transformFilters();
        onApplyFilters(filtersForServer);
    };

    if (loading) {
        return (
            <Paper
                sx={{
                    width: 300,
                    p: 2,
                    ml: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper
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
                    label="Тип Соревнования"
                    select
                    name="sport_type"
                    value={localFilters.sport_type}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Все виды спорта</MenuItem>
                    {sportTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Вид спорта"
                    select
                    name="competition"
                    value={localFilters.competition}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                >
                    <MenuItem value="">Все соревнования</MenuItem>
                    {competitions.map((competition, index) => (
                        <MenuItem key={index} value={competition.id}>
                            {competition.name}
                        </MenuItem>
                    ))}
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
                    label="Местоположение"
                    name="location"
                    value={localFilters.location}
                    onChange={handleFilterChange}
                    variant="outlined"
                    size="small"
                />

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
                    <MenuItem value="month">Текущий месяц</MenuItem>
                    <MenuItem value="quarter">Квартал</MenuItem>
                    <MenuItem value="halfyear">Полгода</MenuItem>
                </TextField>


                {/*<TextField*/}
                {/*    label="Длительность"*/}
                {/*    select*/}
                {/*    name="duration"*/}
                {/*    value={localFilters.duration}*/}
                {/*    onChange={handleFilterChange}*/}
                {/*    variant="outlined"*/}
                {/*    size="small"*/}
                {/*>*/}
                {/*    <MenuItem value="">Выберите длительность</MenuItem>*/}
                {/*    <MenuItem value="1">1 день</MenuItem>*/}
                {/*    <MenuItem value="3">3 дня</MenuItem>*/}
                {/*    <MenuItem value="7">Неделя</MenuItem>*/}
                {/*    <MenuItem value="30">Месяц</MenuItem>*/}
                {/*    <MenuItem value="custom">Другое</MenuItem>*/}
                {/*</TextField>*/}


                <ParticipantsFilter
                    participantsMin={localFilters.participantsMin}
                    participantsMax={localFilters.participantsMax}
                    onChange={handleFilterChange}
                />

                <SortBy value={localFilters.ordering} onChange={handleFilterChange} />


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

export default FiltersPanel