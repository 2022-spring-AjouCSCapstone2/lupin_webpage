import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Redirect } from 'react-router-dom';

interface joinProps {
    loggedIn: boolean
}

export default function Join({ loggedIn }: joinProps) {
    return (
        <Box>
            {
                loggedIn
                ?
                <Redirect to={{ pathname: '/' }} />
                :
                <Box sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}>
                        <Container maxWidth="sm" >
                            <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: 36,
                                fontWeight: 700,
                                mb: 4,
                                fontFamily: 'Jua',
                                color: '#166ecc',
                                letterSpacing: '.3rem',
                                }}>
                                    Lupin
                            </Typography>
                            <Card sx={{ py: 2, px: 4 }}>
                                <CardContent>
                                    <Box component="form">
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <TextField
                                            fullWidth
                                            required
                                            id="name"
                                            name="name"
                                            label="이름"
                                            variant="standard"
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                Age
                                                </InputLabel>
                                                <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'userType',
                                                    id: 'userType',
                                                }}
                                                >
                                                <option value={'STUDENT'}>학생</option>
                                                <option value={'PROFESSOR'}>교수</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <TextField
                                            fullWidth
                                            required
                                            id="schoolId"
                                            name="schoolId"
                                            label="학번"
                                            variant="standard"
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <TextField
                                            fullWidth
                                            required
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            label="전화번호"
                                            variant="standard"
                                            sx={{ display: 'block' }}
                                            />
                                        </Box>
                                        <TextField
                                        fullWidth
                                        required
                                        id="email"
                                        name="email"
                                        label="이메일"
                                        variant="standard"
                                        sx={{ mb: 2 }}
                                        />
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <TextField
                                            fullWidth
                                            required
                                            type="password"
                                            id="pw"
                                            name="password"
                                            label="비밀번호"
                                            variant="standard"
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <TextField
                                            fullWidth
                                            required
                                            type="password"
                                            name="pwConfirm"
                                            id="pwConfirm"
                                            label="비밀번호 확인"
                                            variant="standard"
                                            sx={{ display: 'block' }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                mt: 4,
                                                py: 2,
                                                fontWeight: 700,
                                                fontSize: 16,
                                                letterSpacing: '.1rem'
                                                }}>
                                                Sign Up
                                            </Button>
                                        </Box>     
                                    </Box>    
                                </CardContent>
                            </Card>
                        </Container>
                </Box>
            }
        </Box>
    )
}