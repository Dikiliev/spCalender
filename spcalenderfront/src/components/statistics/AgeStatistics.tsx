import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Typography, Box, Paper } from '@mui/material';
import theme from "@styles/theme";

interface AgeStatisticsProps {
    data: { age: string; count: number }[] | undefined;
}

const COLORS = [theme.palette.primary.main, '#54C392', '#FCDE70', '#F87A53', '#B03052', '#FF7777'];

const AgeStatistics: React.FC<AgeStatisticsProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Возраст участников
                </Typography>
                <Typography color="textSecondary">Нет данных для отображения</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
                Возраст участников
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="age"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default AgeStatistics;
