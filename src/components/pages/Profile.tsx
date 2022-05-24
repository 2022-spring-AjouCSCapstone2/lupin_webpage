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

export default function Profile() {
    return (
      <Container
        sx={{ pt: 10 }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{ fontSize: 20 }}>
              Account Information
          </Typography>
          <Card
            sx={{ p: 0, width: '70%' }}>
            <CardContent
              sx={{ m: 1 }}>
              <Box
                sx={{ display: 'flex', mb: 4 }}>
                <TextField
                  fullWidth
                  id="name"
                  label="이름"
                  defaultValue="고영준"
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="userType"
                  label="신분"
                  defaultValue="학생"
                  sx={{ display: 'block' }}
                />
              </Box>
              <Box
                sx={{ display: 'flex', mb: 4 }}>
                <TextField
                  fullWidth
                  id="schoolId"
                  label="학번"
                  defaultValue="201620625"
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="전화번호"
                  defaultValue="010-1234-5678"
                  sx={{ display: 'block' }}
                />
              </Box>
              <Box
                sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-Mail"
                  defaultValue="rickeykoh11@gmail.com"
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

        <Divider light sx={{ my: 3 }} />

        <Box
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{ fontSize: 20 }}>
              Password
          </Typography>
          <Card
            sx={{ p: 0, width: '70%' }}>
            <CardContent
              sx={{ m: 1 }}>
              <Box
                sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  id="pw"
                  label="Password"
                  type="password"
                  defaultValue=""
                  sx={{ display: 'block', mr: 3 }}
                />
                <TextField
                  fullWidth
                  id="pwConfirm"
                  label="Password Confirm"
                  type="password"
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

        <Divider light sx={{ my: 3 }} />

        <Box
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={{ fontSize: 20 }}>
              Avatar
          </Typography>
          <Card
            sx={{ p: 0, width: '70%' }}>
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