import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface SortByProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const SortBy: React.FC<SortByProps> = ({ value, onChange }) => (
    <TextField
        label="Сортировка"
        select
        name="ordering"
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        fullWidth
    >
        <MenuItem value="">По умолчанию</MenuItem>
        <MenuItem value="start_date">Дата начала</MenuItem>
        <MenuItem value="-start_date">Дата начала (обратный)</MenuItem>
        <MenuItem value="participants">Количество участников</MenuItem>
        <MenuItem value="-participants">Количество участников (обратный)</MenuItem>
    </TextField>
);

export default SortBy;
