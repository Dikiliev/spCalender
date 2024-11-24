import React, { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Grid,
    Paper, Container,
} from '@mui/material';
import { useStatistics } from '@src/hooks/useStatistics';
import EventByDays from '@src/components/statistics/EventByDays';
import AgeStatistics from '@src/components/statistics/AgeStatistics';
import TopEventsByCount from '@src/components/statistics/TopEventsByCount';
import TopEventsByParticipants from '@src/components/statistics/ParticipantsBySport';

const StatisticsPage: React.FC = () => {
    const [city, setCity] = useState<string>('Все города');
    const [sportType, setSportType] = useState<string>('Все виды спорта');
    const { data, isLoading, isError, error } = useStatistics(city, sportType);

    return (
        <Container maxWidth={'xl'} sx={{ p: 3 }}>

            <Paper sx={{ p: 2, mb: 2,  }}>
                <Typography variant="h4" gutterBottom>
                    Статистика
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2, }}>
                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel>Город</InputLabel>
                        <Select
                            value={city}
                            onChange={(e) => setCity(e.target.value as string)}
                            label="Город"
                        >
                            <MenuItem value="Все города">Все города</MenuItem>
                            <MenuItem value="Москва">Москва</MenuItem>
                            <MenuItem value="Сочи">Сочи</MenuItem>
                            <MenuItem value="Уфа">Уфа</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                        <InputLabel>Вид спорта</InputLabel>
                        <Select
                            value={sportType}
                            onChange={(e) => setSportType(e.target.value as string)}
                            label="Вид спорта"
                        >
                            <MenuItem value="Все виды спорта">Все виды спорта</MenuItem>
                            <MenuItem value="Дзюдо">Дзюдо</MenuItem>
                            <MenuItem value="Пауэрлифтинг">Пауэрлифтинг</MenuItem>
                            <MenuItem value="Самбо">Самбо</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </Paper>

            {/* Состояние загрузки */}
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Состояние ошибки */}
            {isError && (
                <Box sx={{ mt: 4 }}>
                    <Typography color="error" align="center">
                        Ошибка: {error.message}
                    </Typography>
                </Box>
            )}

            {/* Данные */}
            {data && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <EventByDays data={data.eventDataByDays} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TopEventsByCount data={data.topEventsByCount} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TopEventsByParticipants data={data.topEventsByParticipants} />
                    </Grid>


                    <Grid item xs={12} md={6}>
                        <TopEventsByCount data={data.topCompetitionByCount} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TopEventsByParticipants data={data.topCompetitionByParticipants} />
                    </Grid>

                    {/*<Grid item xs={12} md={6}>*/}
                    {/*    <AgeStatistics data={data.ageData} />*/}
                    {/*</Grid>*/}
                </Grid>
            )}
        </Container>
    );
};

export default StatisticsPage;
