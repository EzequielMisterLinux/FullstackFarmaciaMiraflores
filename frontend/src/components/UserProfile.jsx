import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import LoginForm from './user/LogIn';
import Register from './user/Register';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');

  const toggleLoginForm = () => {
    setLoginVisible(!loginVisible);
    setRegisterVisible(false);
    handleClose();
  };

  const toggleRegisterForm = () => {
    setRegisterVisible(!registerVisible);
    setLoginVisible(false);
    handleClose();
  };

  const handleLogin = (avatarUrl) => {
    setIsLoggedIn(true);
    setLoginVisible(false);
    setRegisterVisible(false);
    setUserAvatar(avatarUrl);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userAvatar', avatarUrl);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAvatar('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userAvatar');
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserAvatar = localStorage.getItem('userAvatar');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserAvatar(storedUserAvatar);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={userAvatar} alt="User Avatar" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={toggleLoginForm}>
            Login
          </Button>
          {/* <Button variant="contained" color="secondary" onClick={toggleRegisterForm}>
            Register
          </Button> */}
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isLoggedIn && [
          <MenuItem onClick={handleClose} key="profile">
            <Button variant="contained" color="primary">
              Mi Perfil
            </Button>
          </MenuItem>,
          <MenuItem onClick={handleClose} key="account">
            <Button variant="contained" color="primary">
              Mi Cuenta
            </Button>
          </MenuItem>,
          <Divider key="divider" />,
          <MenuItem onClick={handleClose} key="add-account">
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>,
          <MenuItem onClick={handleClose} key="settings">
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>,
          <MenuItem onClick={handleLogout} key="logout">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ]}
      </Menu>

      {loginVisible && (
        <LoginForm
          onClose={toggleLoginForm}
          onLogin={handleLogin}
          onSwitchToRegister={toggleRegisterForm}
        />
      )}
      {registerVisible && (
        <Register
          onClose={toggleRegisterForm}
          onSwitchToLogin={toggleLoginForm}
        />
      )}
    </>
  );
}
