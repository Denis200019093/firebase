import React, { useEffect, useCallback, useState, useContext } from 'react';
import { useUser, useAuth } from 'reactfire';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../UIContext';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const Header: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const { data: user } = useUser();
  const history = useHistory();
  const auth = useAuth();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userFullname, setUserFullname] = useState<string>('');

  useEffect(() => {
    if (user.displayName) {
      setUserFullname(
        user.displayName
          .trim()
          .split(' ')
          .map((x) => x[0])
          .join('')
          .toUpperCase(),
      );
    } else {
      setUserFullname('U');
    }
  }, [user.displayName]);

  const handleLogOut = useCallback(async () => {
    try {
      await auth.signOut();
      clearFirestoreCache();
    } catch (e: any) {
      setAlert({
        show: true,
        severity: 'info',
        message: e.message,
      });
    }
  }, [setAlert, auth]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Tooltip title="Open settings">
              <Avatar onClick={handleOpenUserMenu}>{userFullname}</Avatar>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography onClick={handleLogOut} textAlign="center">
                  Sign out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
