import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CourseCard from '../partials/CourseCard';
import PageTitleBanner from '../partials/PageTitleBanner';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { Courses as MyCourses } from '../../slices/courses';

const pageDataProps = {
    title: '내 수업',
    desc: '수강 신청한 수업들! 이번 학기도 문제없어!',
    isTabBelow: false
};

export default function Courses() {
    const courses = useSelector<ReducerType, MyCourses[]>((state) => state.courses);

    return (
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Container maxWidth="md">
                {courses.map((data, index) => <CourseCard key={index} courseData={data}/>)}
            </Container>
        </Box>
    )
}