import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LectureCard from '../partials/LecturesTodayCard';
import PageTitleBanner from '../partials/PageTitleBanner';
import { ReducerType } from '../../rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { getToday, LOCAL_URL } from '../../variables';
import { setToday } from '../../slices/today';
import { setTodaysLecture } from '../../slices/todaysLecture';
import { Courses } from '../../slices/courses';
import axios from 'axios';
import { useEffect, useState } from 'react';

const pageDataProps = {
    title: '오늘의 강의',
    desc: '질문도 하고 퀴즈도 풀고~ 아자아자 오늘도 힘내자!',
    isTabBelow: false
};

export default function Home() {
    const dispatch = useDispatch();
  
    const today = useSelector<ReducerType>((state) => state.today);
    if(today !== getToday()) {
        axios
        .get(LOCAL_URL + '/courses/today', {withCredentials: true})
        .then((res) => {
            dispatch(setTodaysLecture(res.data));
            dispatch(setToday());
        })
        .catch((error) => {
          console.log(error);
          alert('시간 오류. 브라우저 탭을 끄고 다시 접속해주세요.');
        });
    }

    const todaysLecture = useSelector<ReducerType, Courses[]>((state) => state.todaysLecture);

    const [currentHours, setCurrentHours] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(0);

    useEffect(() => {
        const clock = setInterval(() => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            if(currentHours !== hours) setCurrentHours(hours);
            if(currentMinutes !== minutes) setCurrentMinutes(minutes);
        }, 1000);
        return () => clearInterval(clock);
    }, []);
    
    return (
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Container maxWidth="md">
                {
                    todaysLecture.map((data, index) =>
                        <LectureCard key={index} courseData={data} hours={currentHours} minutes={currentMinutes} />)
                }
            </Container>      
        </Box>
    )
}