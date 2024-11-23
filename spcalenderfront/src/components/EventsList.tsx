import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EventCard from './EventCard';
import { IEvent } from '@src/types/events';
import LoadingBox from "@components/loadingBox/LoadingBox";

interface EventsListProps {
    events: IEvent[];
    isLoading: boolean;
    error: Error | null;
    successMessage?: string; // Опциональное сообщение при успешной загрузке
    noEventsMessage?: string; // Сообщение, если мероприятий нет
}

const EventsList: React.FC<EventsListProps> = ({
                                                   events,
                                                   isLoading,
                                                   error,
                                                   noEventsMessage = "Мероприятия не найдены.",
                                               }) => {
    if (isLoading) {
        return (
            <Box textAlign="center" py={4}>
                <LoadingBox />
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
                    {noEventsMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Box>


            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default EventsList;
