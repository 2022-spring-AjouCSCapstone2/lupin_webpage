import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import {   
  Link as RouterLink,
 } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInFalse } from '../../slices/loggedIn';
import { setNullUser, User } from '../../slices/user';
import { SERVER_URL } from '../../variables';
import { ReducerType } from '../../rootReducer';

const pages = [
  {
    name: '오늘의 강의',
    route: '/',
  },
  {
    name: '내 수업',
    route: '/courses',
  },
  {
    name: '소개',
    route: '/introduce',
  }
];

export default function HeaderNav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  const user = useSelector<ReducerType, User>((state) => state.user);

  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
   axios
    .get(SERVER_URL + '/users/logout', { withCredentials: true })
    .then((res) => {
      console.log(res);
      dispatch(setLoggedInFalse());
      dispatch(setNullUser());
    })
    .catch((error) => {
      console.log('error: ', error);
      alert('로그아웃에 실패했습니다. 브라우저를 껐다 다시 켜주세요.');
    });
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        zIndex: 100,
        boxShadow: 'none',
        borderBottom: '2px solid #e8e5e5'
        }}>
      <Container sx={{ color: 'black'}}>
        <Toolbar disableGutters>
          {/* Site Title */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Jua',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#166ecc',
              textDecoration: 'none',
            }}
          >
            Lupin
          </Typography>
          
          {/* Menu Tabs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Typography
                key={page.name}
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to={page.route}
                sx={{ 
                  ml: 5,
                  backgroundColor: 'inherit',
                  color: '#92afce',
                  fontFamily: 'Jua',
                  textTransform: 'none',
                  textDecoration: 'none',
                  display: 'block',
                  '&:hover': {
                    color: '#5c8abc'
                  },
                }}
              >
                {page.name}           
              </Typography>   
            ))}        
          </Box>

          {/* interactive screen */}
          {/* Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#166ecc' }}/>
            </IconButton>
            {/* Menu */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} sx={{ p: 0 }}>
                  <Typography
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    component={RouterLink}
                    to={page.route}
                    sx={{ 
                      color: 'inherit',
                      textTransform: 'none',
                      textDecoration: 'none',
                      display: 'block',
                      backgroundColor: 'transparent',
                      width: '100%',
                      py: 1,
                      pl: 2,
                      pr: 3
                    }}
                  >
                    {page.name}
                  </Typography>   
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Site Title */}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Jua',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#166ecc',
              textDecoration: 'none',
            }}
          >
            Lupin
          </Typography>
          {/* interactive screen */}

          {/* Profile */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              {
                user.path === null
                ?
                <Avatar
                  alt="Avatar"
                />
                :
                <Avatar alt="Avatar">
                  <img src={user.path} alt="Avatar" style={{ width: '100%', height: '100%' }}/>
                </Avatar>
              }
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
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
              <MenuItem key={'profile'} onClick={handleCloseUserMenu} sx={{ p: 0 }}>
                <Typography
                  key={'profile'}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={'/profile'}
                  sx={{
                    color: 'inherit',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'block',
                    backgroundColor: 'transparent',
                    width: '100%',
                    py: 1,
                    pl: 2,
                    pr: 3
                  }}
                >
                  프로필
                </Typography>   
              </MenuItem>
              <MenuItem key={'logout'} onClick={handleCloseUserMenu} sx={{ p: 0 }}>
                <Typography
                  key={'logout'}
                  onClick={handleLogout}
                  sx={{ 
                    color: 'inherit',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'block',
                    backgroundColor: 'transparent',
                    width: '100%',
                    py: 1,
                    pl: 2,
                    pr: 3
                  }}
                >
                  로그아웃
                </Typography>   
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
