// src/components/header/IconWithLabel.tsx
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import theme from "@styles/theme";

interface IconWithLabelProps {
    icon: React.ReactElement;
    label: string;
    badgeContent?: number;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    sx?: SxProps<Theme>; // Дополнительные стили
    ariaLabel: string;
}

const IconWithLabel: React.FC<IconWithLabelProps> = ({ icon, label, badgeContent = 0, onClick, sx = {}, ariaLabel }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
            <IconButton size='large' aria-label={ariaLabel} sx={{ color: theme.palette.text.primary, ...sx}} onClick={onClick}>
                <Badge
                    variant='standard'
                    badgeContent={badgeContent}
                    color='primary'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    {icon}
                </Badge>
            </IconButton>
            <Typography variant='caption' color={theme.palette.text.primary}>{label}</Typography>
        </Box>
    );
};

export default IconWithLabel;
