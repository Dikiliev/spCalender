import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { queryClient } from '@src/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from '@stores/StoreContext';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <App />
            </LocalizationProvider>,
        </QueryClientProvider>
    </StoreProvider>
);
