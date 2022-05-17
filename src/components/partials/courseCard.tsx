import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {   
  Link as RouterLink,
 } from 'react-router-dom';

interface CourseDataProps {
    courseData: {
        id: number,
        title: string,
        professor: string,
        classroom: string,
        time: {
          dow: string,
          period: string,
        }[],
    };    
};

export default function LectureCard({courseData}: CourseDataProps) {
  const {id, title, time} = courseData;
  return (
    <Button
      component={RouterLink}
      to={`/courses/${id}`}
      sx={{
          mb: 4,
          p: 0,
          width: '100%',
          textAlign: 'start',
          display: 'block',
          boxShadow: '0px 12px 10px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
        <Card
        sx={{ minWidth: 275, px: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                '&:last-child': { paddingBottom: 2 }
                }}>
                <Box>
                  <Typography variant="h5" component="div" sx={{ fontSize: 20, fontWeight: 700 }}>
                      {title}
                  </Typography>
                </Box>
                <Chip
                  label={time.map(t => t.dow).join(', ')}
                  sx={{
                    fontWeight: 900,
                    cursor: 'pointer',
                    backgroundColor: '#b9d1ea',
                    color: '#166ecc',
                    border: '2px solid #166ecc'
                    }}/>
            </CardContent>
        </Card>
    </Button>
  );
}