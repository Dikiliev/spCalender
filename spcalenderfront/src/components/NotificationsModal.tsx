import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
    TextField,
    Stack,
    Typography, Box,
} from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createNotification } from '@src/api/notifications';
import dayjs, { Dayjs } from 'dayjs';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

interface NotificationsModalProps {
    eventId: number;
    startDate: string;
    isOpen: boolean;
    onClose: () => void;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ eventId, startDate, isOpen, onClose }) => {
    const [notifications, setNotifications] = useState({
        weekBefore: true,
        dayBefore: true,
        onEventDay: true,
    });
    const [customNotifications, setCustomNotifications] = useState<Dayjs[]>([]);

    const handleToggleNotification = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAddCustomNotification = () => {
        setCustomNotifications([...customNotifications, dayjs()]);
    };

    const handleCustomNotificationChange = (index: number, value: Dayjs | null) => {
        if (value) {
            const updated = [...customNotifications];
            updated[index] = value;
            setCustomNotifications(updated);
        }
    };

    const handleRemoveCustomNotification = (index: number) => {
        setCustomNotifications(customNotifications.filter((_, i) => i !== index));
    };

    const handleSaveNotifications = async () => {
        const notificationTimes = [
            ...(notifications.weekBefore ? [dayjs(startDate).subtract(7, 'day')] : []),
            ...(notifications.dayBefore ? [dayjs(startDate).subtract(1, 'day')] : []),
            ...(notifications.onEventDay ? [dayjs(startDate)] : []),
            ...customNotifications,
        ];

        try {
            for (const notifyTime of notificationTimes) {
                await createNotification({ event: eventId, notify_time: notifyTime.toISOString() });
            }
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении уведомлений:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Управление уведомлениями</DialogTitle>
                <DialogContent>
                    <Stack>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={notifications.weekBefore}
                                    onChange={() => handleToggleNotification('weekBefore')}
                                />
                            }
                            label="За неделю до события"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={notifications.dayBefore}
                                    onChange={() => handleToggleNotification('dayBefore')}
                                />
                            }
                            label="За день до события"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={notifications.onEventDay}
                                    onChange={() => handleToggleNotification('onEventDay')}
                                />
                            }
                            label="В день события"
                        />

                        { customNotifications.length > 0 && (
                            <Box>
                                <Typography sx={{ mb: 2 }}>Кастомные уведомления:</Typography>
                                {customNotifications.map((time, index) => (
                                    <Stack direction="row" spacing={2} key={index} alignItems="center" sx={{ my: 2}}>
                                        <DateTimePicker
                                            label="Дата и время"
                                            value={time}
                                            onChange={(value) => handleCustomNotificationChange(index, value)}
                                            ampm={false}
                                            renderInput={(params) => <TextField {...params} size="small" />}
                                        />
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveCustomNotification(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                ))}
                            </Box>
                        )}
                        <Button variant="outlined" onClick={handleAddCustomNotification}>
                            Добавить кастомное уведомление
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button onClick={handleSaveNotifications} variant="contained">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
};

export default NotificationsModal;
