import LectureCard from './partials/lecturesToday';

// fake data
const courseData = [
    {
        title: '사이버보안관제(F110-1)',
        professor: '곽진',
        classroom: '팔달관111',
        time: '12:00 ~ 13:15'
    },
    {
        title: '사이버보안캡스톤디자인(F108-1)',
        professor: '손태식',
        classroom: '종합설계동101',
        time: '15:00 ~ 19:15'
    }
];

function Home() {
    return (
        <div>
            {courseData.map(data => <LectureCard courseData={data}/>)}
        </div>
    )
}

export default Home;