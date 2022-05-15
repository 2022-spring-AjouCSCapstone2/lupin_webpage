import CourseCard from './partials/courseCard';

// fake data
const courseData = [
    {
        id: 111,
        title: '철학이란 무엇인가(X022-1)',
        professor: '이진희',
        classroom: '성호관306',
        time: '15:30 ~ 19:15'
    },
    {
        id: 222,
        title: '사이버보안관제(F110-1)',
        professor: '곽진',
        classroom: '팔달관111',
        time: '12:00 ~ 13:15'
    },
    {
        id: 333,
        title: '빅데이터응용보안(F111-1)',
        professor: '김강석',
        classroom: '팔달관410',
        time: '15:30 ~ 19:15'
    },
    {
        id: 444,
        title: '사이버보안캡스톤디자인(F108-1)',
        professor: '손태식',
        classroom: '종합설계동101',
        time: '15:00 ~ 19:15'
    }
];

export default function Courses() {
    return (
        <div>
            {courseData.map((data, index) => <CourseCard key={index} courseData={data}/>)}
        </div>
    )
}