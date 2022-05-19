import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Redirect } from 'react-router-dom';

interface signInProps {
    onSignIn: () => void,
    loggedIn: boolean
}

export default function Login({ onSignIn, loggedIn }: signInProps) {
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
                            <CardContent >
                                  <TextField
                                  fullWidth
                                  id="email"
                                  label="E-Mail"
                                  variant="standard"
                                  sx={{ mb: 2 }}
                                  />
                                  <TextField
                                    fullWidth
                                    id="pw"
                                    label="Password"
                                    variant="standard"
                                    sx={{ display: 'block', mr: 3 }}
                                  />
                                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                      <Button
                                      onClick={onSignIn}
                                      variant="contained"
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
                            </CardContent>
                        </Card>
                        <Link
                        href="#"
                        sx={{
                            display: 'block',
                            mt: 2,
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:visited': {
                                color: 'blue'
                            }
                            }}>Don't have account yet? Sign Up</Link>
                    </Container>
                </Box>  
            }
        </Box>
    );
}