import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import LectureNoteModal from './LectureNoteModal';
import axios from 'axios';
import { compareDate, dateInKorean, SERVER_URL } from '../../variables';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../rootReducer';
import { Courses } from '../../slices/courses';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

export interface LectureDataProps {
    type: string,
    recordKey: string | null,
    script: string | null,
    summary: string | null,
    content: string | null,
    createdAt: string
}

interface LectureListProps {
    date: string,
    title: string
}

interface PreviousLectureProps {
    id: string
}

export default function PreviousLectures({ id }: PreviousLectureProps) {
    const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
    const course = courses.find((course) => course.id === Number(id));
    const courseId = course?.courseId;
    const [lectureData, setLectureData] = useState<LectureDataProps[] | null>(null);
    const [lectures, setLectures] = useState<LectureListProps[] | null>(null);
    const [currentLecture, setCurrentLecture] = useState<LectureListProps | null>(null);
    const [currentData, setCurrentData] = useState<LectureDataProps[] | null>(null);
    
    const backToListHandler = (e: any) => {
        e.preventDefault();
        setCurrentData(null);
        setCurrentLecture(null);
    }

    const changer = (e: any) => {
        e.preventDefault();

        const [currentDate, currentTitle] = e.target.id.split(',');
        setCurrentLecture({
            date: currentDate,
            title: currentTitle
        });
        const filtered = lectureData?.filter((data) => data.createdAt.split('T')[0] === currentDate);
        if(filtered !== undefined) setCurrentData(filtered);
    }

    useEffect(() => {
        axios
        .get(SERVER_URL + `/courses/${courseId}/logs`, { withCredentials: true })
        .then((res) => {
            console.log(res);
            setLectureData(res.data);
            const dates = Array.from(
                new Set<string>([...res.data].map((e) => e.createdAt.split('T')[0]))
                ).sort((a, b) => compareDate(a, b))
                .map((date) => {
                    return {
                        date,
                        title: dateInKorean(date)
                    }
                });
            setLectures(dates);
        })
        .catch((error) => console.log(error));
    }, [])


    return (
        <Container maxWidth="md">
            {
                currentLecture !== null
                ?
                <Card sx={{ py: 3, px: 5 }}>
                    <IconButton
                    onClick={backToListHandler}
                    sx={{ p: 0, mb: 3 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography sx={{ fontSize: 18, mb: 3 }}>{currentLecture.title}</Typography>
                    <List>
                        {
                            currentData === null
                            ?
                            null
                            :
                            currentData.map((data, index) =><LectureNoteModal key={index} logData={data} />)
                        }
                    </List>
                </Card>
                :
                <Card>
                    {
                        lectures === null
                        ?
                        null
                        : 
                        lectures
                        .map((lecture) => 
                            <Box
                            key={lecture.date}
                            sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 18 }}>{lecture.title}</Typography>
                                <Button onClick={changer} id={lecture.date + ',' +  lecture.title} variant="contained">GO</Button>
                            </Box>
                        )
                        .reduce((acc: (JSX.Element[] | null), cur, index) => 
                        acc === null
                        ? [cur]
                        : [...acc, <Divider key={index}></Divider>, cur], null)
                    }
                </Card>
            }
        </Container>
    );
}