import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Grid,
    Chip,
    Paper,
    Tabs,
    Tab,
    Container,
} from '@mui/material';
import { Delete as DeleteIcon, Notifications as NotificationsIcon, MarkAsUnread } from '@mui/icons-material';
import { fetchNotifications, deleteNotification, markAsRead } from '@src/api/notifications';
import { INotification } from '@src/types/notifications';
import LoadingBox from '@components/loadingBox/LoadingBox';

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        const loadNotifications = async () => {
            setLoading(true);
            try {
                const data = await fetchNotifications();
                setNotifications(data);
                setError(null);
            } catch (err) {
                setError('Ошибка при загрузке уведомлений.');
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteNotification(id);
            setNotifications(notifications.filter((notification) => notification.id !== id));
        } catch {
            setError('Не удалось удалить уведомление.');
        }
    };

    const handleMarkAsRead = async (id: number) => {
        try {
            await markAsRead(id);
            setNotifications(
                notifications.map((notification) =>
                    notification.id === id ? { ...notification, is_read: true } : notification
                )
            );
        } catch {
            setError('Не удалось отметить уведомление как прочитанное.');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const unreadNotifications = notifications.filter((n) => n.is_sent && !n.is_read);
    const readNotifications = notifications.filter((n) => n.is_read);
    const upcomingNotifications = notifications.filter((n) => !n.is_sent);

    const renderNotifications = (list: INotification[], chipLabel: string, chipColor: 'primary' | 'secondary' | 'success', opacity=1) => (
        <Grid container spacing={3}>
            {list.map((notification) => (
                <Grid item xs={12} sm={6} md={4} key={notification.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {notification.event.title}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {notification.is_sent
                                    ? `Время отправки: ${new Date(notification.notify_time).toLocaleString()}`
                                    : `Запланировано на: ${new Date(notification.notify_time).toLocaleString()}`}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                Место: {notification.event.location}
                            </Typography>
                            <Chip label={chipLabel} color={chipColor} size='small' sx={{ mt: 1, opacity: opacity }} />
                        </CardContent>
                        <CardActions>
                            {currentTab === 0 && ( // Вкладка "Непрочитанные"
                                <IconButton
                                    aria-label="mark as read"
                                    onClick={() => handleMarkAsRead(notification.id)}
                                >
                                    <MarkAsUnread />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="delete notification"
                                onClick={() => handleDelete(notification.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    if (loading) {
        return <LoadingBox />;
    }

    if (error) {
        return (
            <Box textAlign="center" py={4}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h4">
                    <NotificationsIcon fontSize="large" color="primary" /> Уведомления
                </Typography>
            </Paper>

            <Paper>
                <Tabs value={currentTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" centered>
                    <Tab label="Непрочитанные" />
                    <Tab label="Прочитанные" />
                    <Tab label="Предстоящие" />
                </Tabs>
            </Paper>

            <Box sx={{ mt: 2 }}>
                {currentTab === 0 && (
                    <>
                        {unreadNotifications.length === 0 ? (
                            <Typography color="textSecondary">Нет непрочитанных уведомлений.</Typography>
                        ) : (
                            renderNotifications(unreadNotifications, 'Непрочитанное', 'primary')
                        )}
                    </>
                )}

                {currentTab === 1 && (
                    <>
                        {readNotifications.length === 0 ? (
                            <Typography color="textSecondary">Нет прочитанных уведомлений.</Typography>
                        ) : (
                            renderNotifications(readNotifications, 'Прочитано', 'secondary', 0.6)
                        )}
                    </>
                )}

                {currentTab === 2 && (
                    <>
                        {upcomingNotifications.length === 0 ? (
                            <Typography color="textSecondary">Нет предстоящих уведомлений.</Typography>
                        ) : (
                            renderNotifications(upcomingNotifications, 'Предстоящее', 'secondary', 1)
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default NotificationsPage;
