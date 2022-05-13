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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {   
  Link as RouterLink,
 } from 'react-router-dom';

const pages = [
  {
    name: '오늘의 강의',
    route: '/',
  },
  {
    name: '수업',
    route: '/courses',
  }
];

const settings = [
  {
    name: '프로필',
    route: '/profile',
  },
  {
    name: '로그아웃',
    route: '/logout',
  }
];

export default function HeaderNav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white'}}>
      <Container sx={{ color: 'black'}}>
        <Toolbar disableGutters>
          {/* Title Banner */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Jua',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lupin
          </Typography>
          
          {/* Menu Tabs */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                variant="contained"
                component={RouterLink}
                to={page.route}
                sx={{ 
                  mt: 0.5,
                  ml: 3,
                  backgroundColor: 'inherit',
                  color: '#a8a8a8',
                  fontFamily: 'Jua',
                  textTransform: 'none',
                  display: 'block',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'inherit',
                    boxShadow: 'none'
                  },
                }}
              >
                {page.name}           
              </Button>   
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
              <MenuIcon />
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    variant="contained"
                    component={RouterLink}
                    to={page.route}
                    sx={{ 
                      color: 'black',
                      fontFamily: 'Jua',
                      textTransform: 'none',
                      display: 'block',
                      p: 0,
                      boxShadow: 'none',
                      backgroundColor: 'inherit',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      },
                    }}
                  >
                  <Typography
                      sx={{ textAlign: 'left' }}
                  >
                    {page.name}
                  </Typography>
                  </Button>   
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Title Banner */}
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
              color: 'inherit',
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
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
              />
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
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Button
                    key={setting.name}
                    onClick={handleCloseNavMenu}
                    variant="contained"
                    component={RouterLink}
                    to={setting.route}
                    sx={{ 
                      color: 'inherit',
                      fontFamily: 'Jua',
                      textTransform: 'none',
                      display: 'block',
                      p: 0,
                      backgroundColor: 'inherit',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      },
                      '&:active': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none'
                      },
                    }}
                  >
                    <Typography
                      sx={{ textAlign: 'left' }}
                    >
                        {setting.name}
                    </Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
