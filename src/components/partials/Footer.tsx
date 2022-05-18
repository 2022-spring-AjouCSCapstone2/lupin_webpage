import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {   
  Link as RouterLink,
 } from 'react-router-dom';

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

export default function Footer() {
    return (
        <Box sx={{ py: 10, mt: 10 }}>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: 200, pr: 20 }}>
                            <Typography sx={{ mb: 3, fontWeight: 700, color: '#9e9e9e' }}>Lupin</Typography>
                            <Box sx={{ fontSize: 11, fontWeight: 700, color: '#6b6b6b' }}>
                                <p>아주대학교 2022</p>
                                <p>사이버보안캡스톤디자인 2조</p>
                                <p>조장: 강동희</p>
                                <p>조원: 고영준, 김준표, 신동석, 유영웅</p>
                                <p></p>
                            </Box>
                        </Box>
                        <Box sx={{  }}>
                            <Typography sx={{ mb: 3, fontWeight: 700, color: '#9e9e9e' }}>Navigation</Typography>                    
                            <Box sx={{  }}>
                                {pages.map((page) => (
                                    <Typography
                                        key={page.name}
                                        component={RouterLink}
                                        to={page.route}
                                        sx={{ 
                                            mb: 1,
                                            backgroundColor: 'inherit',
                                            color: '#7a7a7a',
                                            fontFamily: 'Jua',
                                            textDecoration: 'none',
                                            textTransform: 'none',
                                            display: 'block',
                                            '&:hover': {
                                                color: 'black'
                                            },
                                        }}
                                    >
                                        {page.name}           
                                    </Typography>   
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography
                            sx={{
                                fontSize: 24,
                                fontFamily: 'Jua',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#9e9e9e'
                                }}>
                            Lupin
                        </Typography>
                    </Box>
                </Box>
                
                <Divider light sx={{ my: 5 }} />

                <Typography
                    sx={{
                        color: '#9e9e9e',
                        }}>
                    &copy; 2022 Cyber Security Capstone Design; Team 2
                </Typography>
            </Container>
        </Box>
    );
}