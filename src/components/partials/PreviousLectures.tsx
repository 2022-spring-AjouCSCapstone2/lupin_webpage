import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function PreviousLectures() {
    return (
        <Container maxWidth="md">
            <Card>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 18일 (수)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 16일 (월)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 11일 (수)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 09일 (월)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 04일 (수)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 18 }}>2022년 5월 02일 (월)</Typography>
                    <Button variant="contained">GO</Button>
                </Box>
            </Card>
        </Container>
    );
}