import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface CourseDataProps {
    courseData: {
        title: string,
        professor: string,
        classroom: string,
        time: string,
    }    
};

export default function LectureCard({courseData}: CourseDataProps) {
  const {title, professor, classroom, time} = courseData;
  return (
    <Button
      sx={{
          mb: 1,
          p: 0,
          width: '100%',
          textAlign: 'start',
          display: 'block'
      }}
    >
        <Card
        sx={{ minWidth: 275, p: 1 }}>
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
        </Card>
    </Button>
  );
}