import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { Courses } from '../../slices/courses';
import { getKoreanDay, timeFormat } from '../../variables';

interface CourseDescriptionProps {
    id: string
}

export default function CourseDescription({ id }: CourseDescriptionProps) {
    const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
    const course = courses.find((course) => course.id === Number(id));    
    if(course === undefined) throw new TypeError('강의를 찾지 못했습니다.');
    const {
        name,
        courseId,
        timetables,
        professor: {
            name: professor,
            email
        }
    } = course;

    const time = timetables.map((table) => {
        const {
            day,
            startTime,
            endTime
        } = table;
        return `${getKoreanDay(day)}(${timeFormat(startTime)} ~ ${timeFormat(endTime)})`;
    }).join(', ');

    const place = timetables[0].place;
    
    return (
        <Container maxWidth="md">
            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 28, fontWeight: 700, mb: 3 }}>{`${name}(${courseId})`}</Typography>
                    <Typography sx={{ fontSize: 20, mb: 1 }}>{`담당 교수: ${professor}`}</Typography>
                    <Typography sx={{ fontSize: 20, mb: 1 }}>{`이메일: ${email}`}</Typography>
                    <Typography sx={{ fontSize: 20, mb: 1 }}>{`수업 시간: ${time}`}</Typography>
                    <Typography sx={{ fontSize: 20, mb: 1 }}>{`강의실: ${place}`}</Typography>
                    {/* <Typography sx={{ fontSize: 20 }}>내 포인트: 3</Typography> */}
                </CardContent>
            </Card>
        </Container>
    );
}