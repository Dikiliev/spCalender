
export function toDatetime(from: string){
    return  new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Использовать 24-часовой формат
    }).format(new Date(from))
}

export const formatDateToISO = (daysBefore: number): string => {
    const notifyDate = new Date();
    notifyDate.setDate(notifyDate.getDate() - daysBefore);
    return notifyDate.toISOString(); // Преобразует в формат ISO 8601
};
