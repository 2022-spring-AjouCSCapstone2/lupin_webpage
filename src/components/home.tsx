import LectureCard from './partials/lecturesTodayCard';

// fake data
const courseData = [
    {
        title: '사이버보안관제(F110-1)',
        professor: '곽진',
        classroom: '팔달관111',
        time: '12:00 ~ 13:15',
        classOpen: false,
    },
    {
        title: '사이버보안캡스톤디자인(F108-1)',
        professor: '손태식',
        classroom: '종합설계동101',
        time: '15:00 ~ 19:15',
        classOpen: true,
    }
];

export default function Home() {
    return (
        <div>
            {courseData.map((data, index) =><LectureCard key={index} courseData={data}/>)}
        </div>
    )
}