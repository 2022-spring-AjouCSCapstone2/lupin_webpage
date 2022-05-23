import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useState } from 'react';
import {
    Redirect,
    Link as RouterLink
} from 'react-router-dom';
import axios from "axios";
import sha256 from 'crypto-js/sha256';

interface signInProps {
    onSignIn: () => void,
    loggedIn: boolean
}

export default function Login({ onSignIn, loggedIn }: signInProps) {
    console.log(sha256('hello'));
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const emailHandler = (e: any) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const passwordHandler = (e: any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const submitHandler = (e: any) => {
        e.preventDefault();
        const body = {
            email,
            password: sha256(password)
        };
        console.log(body);
        axios
            .post('http://3.37.234.117:5000/users/login', body)
            // .post('http://localhost:5000/users/login', body)
            .then((res) => console.log(res));
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
                        sx={{
                            textAlign: 'center',
                            fontSize: 36,
                            fontWeight: 700,
                            mb: 4,
                            fontFamily: 'Jua',
                            color: '#166ecc',
                            letterSpacing: '.3rem',
                             }}>Lupin</Typography>
                        <Card sx={{ py: 2, px: 4 }}>
                            <CardContent>
                                <Box
                                component="form"
                                onSubmit={submitHandler}
                                // onSubmit={onSignIn}
                                >
                                  <TextField
                                  fullWidth
                                  required
                                  id="email"
                                  label="E-Mail"
                                  name="email"
                                  variant="standard"
                                  onChange={emailHandler}
                                  sx={{ mb: 2 }}
                                  />
                                  <TextField
                                    fullWidth
                                    required
                                    id="pw"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    variant="standard"
                                    onChange={passwordHandler}
                                    sx={{ display: 'block', mr: 3 }}
                                  />
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
                                          Sign In
                                      </Button>
                                  </Box>     
                                </Box>    
                            </CardContent>
                        </Card>
                        <Link
                        component={RouterLink}
                        to={"/join"}
                        sx={{
                            display: 'block',
                            mt: 2,
                            textAlign: 'center',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            color: '#166ecc',
                            '&:visited': {
                                color: '#166ecc',
                            }
                            }}>Don't have account yet? Sign Up</Link>
                    </Container>
                </Box>  
            }
        </Box>
    );
}