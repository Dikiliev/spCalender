export const saveToStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Ошибка при сохранении в localStorage: ${error}`);
    }
};

export const loadFromStorage = <T>(key: string): T | null => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
        console.error(`Ошибка при загрузке из localStorage: ${error}`);
        return null;
    }
};
