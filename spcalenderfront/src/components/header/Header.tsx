import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Container, } from '@mui/material';

import ProfileMenu from './ProfileMenu';
import styles from './Header.module.css';
import Logo from '@assets/favicon.svg?react';
import IconWithLabel from './IconWithLabel';

import AccountCircle from '@mui/icons-material/AccountCircle';

import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import NotificationsIcon from '@mui/icons-material/Notifications';

import IconButton from '@mui/material/IconButton';
import theme from '@styles/theme';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '@stores/StoreContext';

const Header: React.FC = observer(() => {
    const navigate = useNavigate();

    const { authStore } = useStore();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>

                <Container maxWidth='xl'>
                    <Toolbar disableGutters sx={{ gap: 3 }}>
                        <Logo className={styles.logo} onClick={() => navigate('/')} />
                        {/*<Button variant='contained' size='large' sx={{ px: 2 }} onClick={() => navigate('/categories')} endIcon={<MenuIcon />}>*/}
                        {/*    Каталог*/}
                        {/*</Button>*/}

                        <Box flexGrow={1}></Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex', gap: theme.spacing(5), alignItems: 'center' } }}>
                            <IconWithLabel
                                onClick={() => navigate('/support')}
                                icon={<SupportAgentIcon />}
                                label='Поддержка'
                                badgeContent={0}
                                ariaLabel='show support'
                            />


                            <IconWithLabel
                                onClick={() => navigate('/statistics')}
                                icon={<BarChartIcon />}
                                label='Статистика'
                                badgeContent={0}
                                ariaLabel='show statistics'
                            />

                            {/*<IconWithLabel*/}
                            {/*    onClick={() => navigate('/calendar')}*/}
                            {/*    icon={<CalendarMonthIcon />}*/}
                            {/*    label='Календарь'*/}
                            {/*    badgeContent={0}*/}
                            {/*    ariaLabel='show calendar'*/}
                            {/*/>*/}

                            <IconWithLabel
                                onClick={() => navigate('/')}
                                icon={<EventIcon />}
                                label='Мероприятия'
                                badgeContent={0}
                                ariaLabel='show events'
                            />




                            {authStore.isAuthenticated ? (
                                <>
                                    <IconWithLabel
                                        onClick={() => navigate('/notifications')}
                                        icon={<NotificationsIcon />}
                                        label='Уведомления'
                                        badgeContent={0}
                                        ariaLabel='show notifications'
                                    />
                                    {/*<IconWithLabel*/}
                                    {/*    onClick={() => navigate('/favorites')}*/}
                                    {/*    icon={<FavoriteIcon />}*/}
                                    {/*    label='Избранное'*/}
                                    {/*    badgeContent={2}*/}
                                    {/*    ariaLabel='show favorites'*/}
                                    {/*/>*/}

                                    <IconWithLabel
                                        icon={<AccountCircle />}
                                        label='Профиль'
                                        ariaLabel='account of current user'
                                        onClick={handleProfileMenuOpen}
                                    />
                                </>

                            ) : (
                                <Button variant='contained' onClick={() => navigate('/login')}>
                                    Войти
                                </Button>
                            )}
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size='large' aria-label='show more' aria-haspopup='true' onClick={handleMobileMenuOpen} >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <ProfileMenu
                anchorEl={anchorEl}
                mobileMoreAnchorEl={mobileMoreAnchorEl}
                isMenuOpen={isMenuOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                handleMenuClose={handleMenuClose}
                handleMobileMenuClose={handleMobileMenuClose}
                handleProfileMenuOpen={handleProfileMenuOpen}
            />
        </Box>
    );
});

export default Header;
