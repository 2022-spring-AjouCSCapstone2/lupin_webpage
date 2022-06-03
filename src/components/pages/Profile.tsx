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
import { setUser, User } from '../../slices/user';
import { useState } from 'react';
import { pwRegex, SERVER_URL } from '../../variables';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import sha256 from 'crypto-js/sha256';
import { Input, InputLabel, Modal, CircularProgress } from '@mui/material';

export default function Profile() {
    const user = useSelector<ReducerType, User>((state) => state.user);
    const [phone, setPhone] = useState('');
    const [curPw, setCurPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [avatarFile, setAvatarFile] = useState<Blob>();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const phoneHandler = (e: any) => {
      e.preventDefault();
      const replaced = e.target.value.replace(/\D/g, '');
      e.target.value = replaced;
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

    const imageSelectHandler = (e: any) => {
      e.preventDefault();
      const file = e.target.files[0];
      setAvatarFile(file);
      const avatar = document.getElementById('avatarPreview');
      if(avatar) {
        avatar.innerHTML = '';
        const image = document.createElement('img');
        image.style.width = '100%';
        image.style.height = '100%';
        image.src = URL.createObjectURL(file);
        avatar.appendChild(image);
      }
    }

    const userChangeHandler = (e: any) => {
      e.preventDefault();
      const body = { phone: Number(phone) };
      axios
      .patch(SERVER_URL + '/users', body, { withCredentials: true })
      .then((res) => {
        console.log(res);
        const updated = {...user, phone: Number(phone)};
        dispatch(setUser(updated));
        alert('전화번호가 등록되었습니다.');
        window.location.reload();
      })
      .catch((error) => alert('잘못된 접근입니다.'))
    }
    
    const passwordChangeHandler = (e: any) => {
      e.preventDefault();
      if(newPw !== pwConfirm) alert("비밀번호가 일치하지 않습니다.");
      else if(!newPw.match(pwRegex)) alert("비밀번호는 알파벳, 숫자, 특수문자를 모두 포함한 8~15 글자로 이루어져야 합니다.");
      else {      
        const body = { 
          password: sha256(curPw).toString(),
          newPassword: sha256(newPw).toString()
        };
        axios
        .patch(SERVER_URL + '/users/password', body, { withCredentials: true })
        .then((res) => {
          console.log(res);
          alert('비밀번호가 변경되었습니다.');
          window.location.reload();
        })
        .catch((error) => alert('사용자 정보가 잘못되었습니다.'));
      }
    }

    const avatarChangeHandler = (e: any) => {
      e.preventDefault();
      const formData = new FormData();
      if(avatarFile) {
        formData.append("image", avatarFile);
        handleOpen();
        axios
        .patch(SERVER_URL + '/users/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })
        .then((res) => {
          console.log(res);
          handleClose();
          const updatedUser = {...user, path: res.data.path};
          dispatch(setUser(updatedUser));
          alert('프로필 사진을 변경했습니다.');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          handleClose();
          alert('프로필 사진 변경에 실패했습니다.');
        });
      }
    }

    return (
      <Container
        sx={{ pt: { xs: 7, md: 10 } }}>
        {/* Loading Modal */}
        <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <CircularProgress 
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}/>
        </Modal>

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
            component='form'
            onSubmit={userChangeHandler}
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
                type="submit"
                sx={{ textTransform: 'none' }}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Divider light sx={{ my: { xs: 5, md: 3 } }} />

        {/* Password */}
        <Box
          component='form'
          onSubmit={passwordChangeHandler}
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
                type="submit"
                sx={{ textTransform: 'none' }}>
                Change password
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Divider light sx={{ my: { xs: 5, md: 3 } }} />

        {/*  Avatar */}
        <Box
          component='form'
          onSubmit={avatarChangeHandler}
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
                {
                  user.path === null
                  ?
                  <Avatar
                    alt="Avatar"                    
                    id="avatarPreview"
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  :
                  <Avatar
                  alt="Avatar"
                  id="avatarPreview"
                  sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    <img src={user.path} alt="Avatar" style={{ width: '100%', height: '100%' }}/>
                  </Avatar>
                }
                  <Box>
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: 'none',
                          color: 'black',
                          borderColor: '#a8a8a8'
                          }}>
                            <Input
                            id="fileInput"
                            type="file"
                            inputProps={{
                              accept: 'image/*'
                            }}
                            onChange={imageSelectHandler}
                            sx={{
                              display: 'none'
                            }}
                            />             
                            <InputLabel
                            htmlFor="fileInput"
                            sx={{
                              color: 'black',
                              fontSize: 14,
                              cursor: 'pointer'
                            }}
                            >
                              Choose image
                            </InputLabel>
                      </Button>
                  </Box>        
              </Box>
            </CardContent>
            <CardActions
              sx={{ display: 'flex', justifyContent: 'end', pr: 3, py: 2, backgroundColor: '#F9FAFB'}}>
              <Button
                type='submit'
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