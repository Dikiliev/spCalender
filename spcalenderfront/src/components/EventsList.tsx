import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EventCard from './EventCard';
import { IEvent } from '@src/types/events';
import LoadingBox from "@components/loadingBox/LoadingBox";

interface EventsListProps {
    events: IEvent[];
    isLoading: boolean;
    error: Error | null;
}

const EventsList: React.FC<EventsListProps> = ({ events, isLoading, error }) => {
    if (isLoading) {
        return (
            <Box textAlign="center" py={4}>
                <LoadingBox/>
                <Typography variant="h6" color="textSecondary">
                    Загрузка...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">
                    Ошибка при загрузке данных: {error.message}
                </Typography>
            </Box>
        );
    }

    if (events.length === 0) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="textSecondary">
                    Мероприятия не найдены.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={2}>
            {events.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <EventCard event={event} />
                </Grid>
            ))}
        </Grid>
    );
};

export default EventsList;
