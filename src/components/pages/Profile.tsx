import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { User } from '../../slices/user';
import { useState } from 'react';

export default function Profile() {
    const user = useSelector<ReducerType, User>((state) => state.user);
    const [phone, setPhone] = useState('');
    const [curPw, setCurPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    const phoneHandler = (e: any) => {
      e.preventDefault();
      setPhone(e.target.value);
    }
    
    const curPwHandler = (e: any) => {
      e.preventDefault();
      setCurPw(e.target.value);
    }
    
    const newPwHandler = (e: any) => {
      e.preventDefault();
      setNewPw(e.target.value);
    }
    
    const pwConfirmHandler = (e: any) => {
      e.preventDefault();
      setPwConfirm(e.target.value);
    }

    return (
      <Container
        sx={{ pt: { xs: 7, md: 10 } }}>

        {/* Account Information */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'start', md: 'space-between' },
            alignItems: { xs: 'center', md: 'start' }
            }}>
          <Typography
            sx={{ fontSize: { xs: 26, md: 20 }, mb: { xs: 4, md: 0 } }}>
              Account Information
          </Typography>
          <Card
            sx={{ p: 0, width: { xs: '100%', md: '70%' } }}>
            <CardContent
              sx={{ m: 1 }}>
              <Box
                sx={{ display: 'flex', mb: 4 }}>
                <TextField
                  fullWidth
                  id="nameLarge"
                  label="이름"
                  disabled
                  defaultValue={user.name}
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="userTypeLarge"
                  label="신분"
                  disabled
                  defaultValue={user.userType === 'STUDENT' ? '학생' : '교수'}
                  sx={{ display: 'block' }}
                />
              </Box>
              <Box
                sx={{ display: 'flex', mb: 4 }}>
                <TextField
                  fullWidth
                  id="userIdLarge"
                  label="학번"
                  disabled
                  defaultValue={user.userId}
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="phoneLarge"
                  label="전화번호"
                  onChange={phoneHandler}
                  defaultValue={user.phone}
                  sx={{ display: 'block' }}
                />
              </Box>
              <Box
                sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  id="emailLarge"
                  label="E-Mail"
                  disabled
                  defaultValue={user.email}
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{ display: 'flex', justifyContent: 'end', pr: 3, py: 2, backgroundColor: '#F9FAFB'}}>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Divider light sx={{ my: { xs: 5, md: 3 } }} />

        {/* Password */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'start', md: 'space-between' },
            alignItems: { xs: 'center', md: 'start' }
            }}>
          <Typography
            sx={{ fontSize: { xs: 26, md: 20 }, mb: { xs: 4, md: 0 } }}>
            Password
          </Typography>
          <Card
            sx={{ p: 0, width: { xs: '100%', md: '70%' } }}>
            <CardContent
              sx={{ m: 1 }}>           
              <TextField
                fullWidth
                id="curPwLarge"
                label="Current Password"
                type="password"
                onChange={curPwHandler}
                defaultValue=""
                sx={{ display: 'block', mb: 4 }}
              />
              <Box
                sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  id="newPwLarge"
                  label="New Password"
                  type="password"
                  onChange={newPwHandler}
                  defaultValue=""
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="pwConfirmLarge"
                  label="Password Confirm"
                  type="password"
                  onChange={pwConfirmHandler}
                  defaultValue=""
                  sx={{ display: 'block' }}
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{ display: 'flex', justifyContent: 'end', pr: 3, py: 2, backgroundColor: '#F9FAFB'}}>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}>
                Change password
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Divider light sx={{ my: { xs: 5, md: 3 } }} />

        {/*  Avatar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'start', md: 'space-between' },
            alignItems: { xs: 'center', md: 'start' }
            }}>
          <Typography
            sx={{ fontSize: { xs: 26, md: 20 }, mb: { xs: 4, md: 0 } }}>
            Avatar
          </Typography>
          <Card
            sx={{ p: 0, width: { xs: '100%', md: '70%' } }}>
            <CardContent
              sx={{ m: 1 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center' }}>
                 <Avatar
                    alt="Remy Sharp"
                    src="/broken-image.jpg"
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />          
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{ textTransform: 'none', color: 'black', borderColor: '#a8a8a8'}}>
                        Choose image
                    </Button>  
                  </Box>        
              </Box>
            </CardContent>
            <CardActions
              sx={{ display: 'flex', justifyContent: 'end', pr: 3, py: 2, backgroundColor: '#F9FAFB'}}>
              <Button
                variant="contained"
                sx={{ textTransform: 'none' }}>
                Upload & Save
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    )
}