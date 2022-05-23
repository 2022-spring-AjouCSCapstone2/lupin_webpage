import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import {   
  Link as RouterLink,
 } from 'react-router-dom';

interface CourseDataProps {
    courseData: {
        id: number,
        title: string,
        professor: string,
        classroom: string,
        time: string,
        classOpen: boolean,
    }
};

export default function LectureCard({courseData}: CourseDataProps) {
  const {id, title, professor, classroom, time, classOpen} = courseData;
  return (
      <Card
      sx={{ minWidth: 275, p: 1, mb: 1 }}>
          <CardContent>
              <Typography variant="h5" component="div">
                  {title}
              </Typography>
              <Typography 
                sx={{ 
                  my: 1.5,
                  fontSize: 14
                }}
                color="text.secondary">
              {professor} | {classroom}
              </Typography>
              <Typography variant="body2">
                {time}
              </Typography>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
            variant="text"
            component={RouterLink}
            to={`/courses/${id}`}
            >
              더보기
            </Button>
            {
              classOpen
              ? <Button
                  variant="contained"
                  sx={{ width: '22%' }}>
                    참가하기
                    {/* 생성하기 */}
                </Button>
              : <Button
                  variant="contained"
                  disabled
                  sx={{ width: '22%' }}>
                    50분 뒤 시작
                </Button>
            }
          </CardActions>
      </Card>
  );
}