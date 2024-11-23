import React, { useState } from 'react';
import { Card, CardContent, Typography, Stack, Button, Box, IconButton } from '@mui/material';
import {
    LocationOn as LocationIcon,
    CalendarToday as CalendarIcon,
    People as PeopleIcon,
    Sports as SportsIcon,
    Wc as GenderIcon,
    Group as AgeGroupIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { IEvent } from '@src/types/events';
import NotificationsModal from './NotificationsModal'; // Компонент модального окна для уведомлений

interface EventCardProps {
    event: IEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <>
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

                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                            <CalendarIcon fontSize="small" color="primary" />
                            <Typography variant="body2">
                                {new Date(event.start_date).toLocaleDateString()} —{' '}
                                {new Date(event.end_date).toLocaleDateString()}
                            </Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                            <LocationIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{event.location}</Typography>
                        </Stack>

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

                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                            <AgeGroupIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{event.age_group || 'Не указана'}</Typography>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PeopleIcon fontSize="small" color="primary" />
                            <Typography variant="body2">{event.participants} участников</Typography>
                        </Stack>
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <Button size="small" variant="outlined">
                            Подробнее
                        </Button>
                        <IconButton color="primary" onClick={handleOpenModal}>
                            <NotificationsIcon />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>

            {/* Модальное окно для управления уведомлениями */}
            <NotificationsModal
                eventId={event.id}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default EventCard;
