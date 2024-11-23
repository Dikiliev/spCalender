import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import theme from "@styles/theme";

interface EventByDaysProps {
    data: { day: string; events: number }[];
}

const EventByDays: React.FC<EventByDaysProps> = ({ data }) => (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
            Мероприятия по дням
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}

            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day">
                    <Label value="Дни" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis>
                    <Label
                        value="Количество мероприятий"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: 'middle' }}
                    />
                </YAxis>
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="events"
                    stroke={theme.palette.primary.main}
                    activeDot={{ r: 8 }}
                    name="Мероприятия"
                />
            </LineChart>
        </ResponsiveContainer>
    </Paper>
);

export default EventByDays;
