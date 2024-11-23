import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { AccountCircle, Logout, Notifications, SupportAgent, BarChart, Event } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@stores/StoreContext';

interface ProfileMenuProps {
    anchorEl: null | HTMLElement;
    mobileMoreAnchorEl: null | HTMLElement;
    isMenuOpen: boolean;
    isMobileMenuOpen: boolean;
    handleMenuClose: () => void;
    handleMobileMenuClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
                                                     anchorEl,
                                                     mobileMoreAnchorEl,
                                                     isMenuOpen,
                                                     isMobileMenuOpen,
                                                     handleMenuClose,
                                                     handleMobileMenuClose,
                                                 }) => {
    const navigate = useNavigate();
    const { authStore } = useStore();

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleNavigate = (to: string) => {
        handleMenuClose();
        handleMobileMenuClose();
        navigate(to);
    };

    return (
        <>
            {/* Десктопное меню */}
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => handleNavigate('/profile')}>
                    <IconButton size="small" color="inherit">
                        <AccountCircle />
                    </IconButton>
                    Профиль
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/logout')}>
                    <IconButton size="small" color="inherit">
                        <Logout />
                    </IconButton>
                    Выйти
                </MenuItem>
            </Menu>

            {/* Мобильное меню */}
            <Menu
                id={mobileMenuId}
                anchorEl={mobileMoreAnchorEl}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => handleNavigate('/support')}>
                    <IconButton size="large" color="inherit">
                        <SupportAgent />
                    </IconButton>
                    <p>Поддержка</p>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/statistics')}>
                    <IconButton size="large" color="inherit">
                        <BarChart />
                    </IconButton>
                    <p>Статистика</p>
                </MenuItem>
                <MenuItem onClick={() => handleNavigate('/')}>
                    <IconButton size="large" color="inherit">
                        <Event />
                    </IconButton>
                    <p>Мероприятия</p>
                </MenuItem>
                {authStore.isAuthenticated && (
                    <>
                        <MenuItem onClick={() => handleNavigate('/notifications')}>
                            <IconButton size="large" color="inherit">
                                <Badge badgeContent={0} color="primary">
                                    <Notifications />
                                </Badge>
                            </IconButton>
                            <p>Уведомления</p>
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigate('/profile')}>
                            <IconButton size="large" color="inherit">
                                <AccountCircle />
                            </IconButton>
                            <p>Профиль</p>
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigate('/logout')}>
                            <IconButton size="large" color="inherit">
                                <Logout />
                            </IconButton>
                            <p>Выйти</p>
                        </MenuItem>
                    </>
                )}
            </Menu>
        </>
    );
};

export default ProfileMenu;
