export interface INotification {
    id: number;
    event: {
        id: number;
        title: string;
        start_date: string;
        location: string;
    };
    notify_time: string;
    is_sent: boolean;
    is_read: boolean;
}

export interface ICreateNotification {
    event: number;
    notify_time: string;
}
