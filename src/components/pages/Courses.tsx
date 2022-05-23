import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CourseCard from '../partials/CourseCard';
import PageTitleBanner from '../partials/PageTitleBanner';

// fake data
const courseData = [
    {
        id: 111,
        title: '철학이란 무엇인가(X022-1)',
        professor: '이진희',
        classroom: '성호관306',
        time: [
            {
                dow: '화',
                period: '13:30 ~ 14:45'
            },
            {
                dow: '목',
                period: '12:00 ~ 13:15'
            }
        ]
    },
    {
        id: 222,
        title: '사이버보안관제(F110-1)',
        professor: '곽진',
        classroom: '팔달관111',
        time: [
            {
                dow: '금',
                period: '13:30 ~ 14:45'
            }
        ]
    },
    {
        id: 333,
        title: '빅데이터응용보안(F111-1)',
        professor: '김강석',
        classroom: '팔달관410',
        time: [
            {
                dow: '화',
                period: '13:30 ~ 14:45'
            },
            {
                dow: '목',
                period: '12:00 ~ 13:15'
            }
        ]
    },
    {
        id: 444,
        title: '사이버보안캡스톤디자인(F108-1)',
        professor: '손태식',
        classroom: '종합설계동101',
        time: [
            {
                dow: '월',
                period: '13:30 ~ 14:45'
            },
            {
                dow: '수',
                period: '13:30 ~ 14:45'
            },
            {
                dow: '금',
                period: '12:00 ~ 13:15'
            }
        ]
    }
];

const pageDataProps = {
    title: '내 수업',
    desc: '수강 신청한 수업들! 이번 학기도 문제없어!',
    isTabBelow: false
};

export default function Courses() {
    return (
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Container maxWidth="md">
                {courseData.map((data, index) => <CourseCard key={index} courseData={data}/>)}
            </Container>
        </Box>
    )
}