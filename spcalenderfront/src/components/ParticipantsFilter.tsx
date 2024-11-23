import React from 'react';
import { TextField } from '@mui/material';

interface ParticipantsFilterProps {
    participantsMin: string;
    participantsMax: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ParticipantsFilter: React.FC<ParticipantsFilterProps> = ({ participantsMin, participantsMax, onChange }) => (
    <>
        <TextField
            label="Минимум участников"
            type="number"
            name="participantsMin"
            value={participantsMin}
            onChange={onChange}
            variant="outlined"
            size="small"
            fullWidth
        />
        <TextField
            label="Максимум участников"
            type="number"
            name="participantsMax"
            value={participantsMax}
            onChange={onChange}
            variant="outlined"
            size="small"
            fullWidth
        />
    </>
);

export default ParticipantsFilter;
