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
import { useState } from 'react';
import {   
  Link as RouterLink,
 } from 'react-router-dom';
import axios from "axios";
import sha256 from 'crypto-js/sha256';

interface joinProps {
    loggedIn: boolean
}

export default function Join({ loggedIn }: joinProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(0);
    const [userType, setUserType] = useState('STUDENT');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    const nameHandler = (e: any) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const emailHandler = (e: any) => {
        e.preventDefault();
        setEmail(e.target.value);
    }
    const userIdHandler = (e: any) => {
        e.preventDefault();
        const replaced = e.target.value.replace(/\D/g, '');
        e.target.value = replaced;
        setUserId(e.target.value);
    }
    const userTypeHandler = (e: any) => {
        e.preventDefault();
        setUserType(e.target.value);
    }
    const phoneHandler = (e: any) => {
        e.preventDefault();
        const replaced = e.target.value.replace(/\D/g, '');
        e.target.value = replaced;
        setPhone(e.target.value);
    }
    const passwordHandler = (e: any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const pwConfirmHandler = (e: any) => {
        e.preventDefault();
        setPwConfirm(e.target.value);
    }
    const submitHandler = (e: any) => {
        e.preventDefault();
        if(password !== pwConfirm) alert("비밀번호가 일치하지 않습니다.");
        else {
            const body = {
                userId: Number(userId),
                name,
                userType,
                email,
                password: sha256(password).toString(),
                phone
            };
            axios
                .post('http://3.37.234.117:5000/users/join', body)
                .then((res) => console.log(res))
                .catch((error) => {
                    alert('Failed to sign up');
                });
        }
    }

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
                            component={RouterLink}
                            to={'/login'}
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
                                    <Box
                                    component="form"
                                    onSubmit={submitHandler}
                                    >
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <TextField
                                            fullWidth
                                            required
                                            id="name"
                                            label="이름"
                                            variant="standard"
                                            inputProps={{
                                                maxLength: 30
                                            }}
                                            onChange={nameHandler}
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                                신분
                                                </InputLabel>
                                                <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'userType',
                                                    id: 'userType',
                                                }}
                                                onChange={userTypeHandler}
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
                                            id="userId"
                                            label="학번(교번)"
                                            variant="standard"
                                            inputProps={{
                                                maxLength: 20
                                            }}
                                            onChange={userIdHandler}
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <TextField
                                            fullWidth
                                            required
                                            id="phoneNumber"
                                            label="전화번호"
                                            variant="standard"
                                            onChange={phoneHandler}
                                            sx={{ display: 'block' }}
                                            />
                                        </Box>
                                        <TextField
                                        fullWidth
                                        required
                                        id="email"
                                        label="이메일"
                                        variant="standard"
                                        inputProps={{
                                            maxLength: 40
                                        }}
                                        onChange={emailHandler}
                                        sx={{ mb: 2 }}
                                        />
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <TextField
                                            fullWidth
                                            required
                                            type="password"
                                            id="pw"
                                            label="비밀번호"
                                            variant="standard"
                                            inputProps={{
                                                minLength: 8,
                                                maxLength: 16
                                            }}
                                            onChange={passwordHandler}
                                            sx={{ display: 'block', mr: 4 }}
                                            />
                                            <TextField
                                            fullWidth
                                            required
                                            type="password"
                                            id="pwConfirm"
                                            label="비밀번호 확인"
                                            variant="standard"
                                            inputProps={{
                                                minLength: 8,
                                                maxLength: 16
                                            }}
                                            onChange={pwConfirmHandler}
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