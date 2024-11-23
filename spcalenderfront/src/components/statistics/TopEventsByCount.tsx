import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import theme from "@styles/theme";

interface TopEventsByParticipantsProps {
    data: { sport: string; events: number }[];
}

const TopEventsByParticipants: React.FC<TopEventsByParticipantsProps> = ({ data }) => {
    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Топ-10 типов спорта по количеству мероприятии
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sport">
                        <Label value="Виды спорта" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label
                            value="Количество участников"
                            angle={-90}
                            position="insideLeft"
                            style={{ textAnchor: 'middle' }}
                        />
                    </YAxis>
                    <Tooltip />
                    <Bar dataKey="events" fill={theme.palette.primary.main} name="Участники" />
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default TopEventsByParticipants;
