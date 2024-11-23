// Тип для существующего уведомления
export interface INotification {
    id: number;
    user: number;
    event: number;
    notify_time: string;
    is_sent: boolean;
    created_at: string;
}

// Тип для создания уведомления
export interface ICreateNotification {
    event: number;
    notify_time: string;
}
