import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LectureCard from './partials/LecturesTodayCard';
import PageTitleBanner from './partials/PageTitleBanner';

// fake data
const courseData = [
    {
        id: 222,
        title: '사이버보안관제(F110-1)',
        professor: '곽진',
        classroom: '팔달관111',
        time: '12:00 ~ 13:15',
        classOpen: false,
    },
    {
        id: 444,
        title: '사이버보안캡스톤디자인(F108-1)',
        professor: '손태식',
        classroom: '종합설계동101',
        time: '15:00 ~ 19:15',
        classOpen: true,
    }
];

const pageDataProps = {
    title: '오늘의 강의',
    desc: '질문도 하고 퀴즈도 풀고~ 아자아자 오늘도 힘내자!'
};

export default function Home() {
    return (
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Container maxWidth="md">
                {courseData.map((data, index) =><LectureCard key={index} courseData={data}/>)}
            </Container>        
        </Box>
    )
}