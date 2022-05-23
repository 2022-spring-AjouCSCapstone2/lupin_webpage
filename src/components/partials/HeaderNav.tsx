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
    route: '#',
  }
];

interface NavProps {
  logoutHandler: () => void
}

export default function HeaderNav({ logoutHandler }: NavProps) {
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

  const handleLogout = () => {
   axios
    .get('http://3.37.234.117:5000/users/logout')
    .then((res) => {
      console.log(res);      
      logoutHandler();
    })
    .catch((error) => console.log('error: ', error));
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
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
                      backgroundColor: 'transparent'
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
              <MenuItem key={'profile'} onClick={handleCloseUserMenu}>
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
                    backgroundColor: 'transparent'
                  }}
                >
                  프로필
                </Typography>   
              </MenuItem>
              <MenuItem key={'my-posts'} onClick={handleCloseUserMenu}>
                <Typography
                  key={'my-posts'}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={'/my-posts'}
                  sx={{ 
                    color: 'inherit',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'block',
                    backgroundColor: 'transparent'
                  }}
                >
                  내 게시물
                </Typography>   
              </MenuItem>
              <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                <Typography
                  key={'profile'}
                  onClick={handleLogout}
                  sx={{ 
                    color: 'inherit',
                    textTransform: 'none',
                    textDecoration: 'none',
                    display: 'block',
                    backgroundColor: 'transparent'
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
