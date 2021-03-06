import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Courses } from '../../slices/courses';
import { timeFormat } from '../../variables';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../rootReducer';
import { User } from '../../slices/user';
import { SocketContext, SocketEventProps } from '../context/socket';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { enterClassRoom } from '../../slices/classRoom';

interface LectureProps {
  courseData: Courses
  hours: number | null,
  minutes: number | null
}

export default function LectureCard({ courseData, hours, minutes }: LectureProps) {  
  const {
    id,
    courseId,
    name,
    timetables,
    professor: {
      name: professor
    }
  } = courseData;

  const today = useSelector<ReducerType>((state) => state.today);

  const timetable = timetables.find((timetable) => timetable.day === today);

  if(timetable === undefined) {
    throw new TypeError('요일에 맞는 시간을 찾지 못했습니다.');
  }

  const {
    startTime,
    endTime,
    place
  } = timetable;
  
  const user = useSelector<ReducerType, User>((state) => state.user);

  const startHours = Number(startTime.slice(0, 2));
  const startMinutes = Number(startTime.slice(2, 4));
  const endHours = Number(endTime.slice(0, 2));
  const endMinutes = Number(endTime.slice(2, 4));

  const startFullTime = startHours * 60 + startMinutes;
  const endFullTime = endHours * 60 + endMinutes;
  const currentFullTime = (hours === null || minutes === null) ? null : hours * 60 + minutes;
  const minutesGap = currentFullTime === null ? 9999 : startFullTime - currentFullTime;
  const classOpen = currentFullTime === null
                    ? false
                    : ( minutesGap <= 10 && currentFullTime <= endFullTime );

  const timeLeft = () => {
    if(currentFullTime === null) return '로딩중...';
    if(endFullTime <= currentFullTime) return '오늘 수업 끝!';
    else if(minutesGap > 10) {
      if(minutesGap < 60) return `${minutesGap}분 뒤 시작`;
      else return `${Math.floor(minutesGap / 60)}시간 ${minutesGap % 60}분 뒤 시작`;
    }
  }

  const dispatch = useDispatch();

  const socketEvents = useContext<SocketEventProps>(SocketContext);
  const { createRoom, joinRoom } = socketEvents;

  const history = useHistory();

  const openRoom = (roomId: string) => {
    const classRoom = {
      name,
      courseId,
      roomId
    };
    console.log(`attended room: ${roomId}, on course ${courseId}`);
    dispatch(enterClassRoom(classRoom));
  }

  const handleRejected = () => {
    history.push('/');
  }

  const createRoomHandler = () => {
    createRoom(courseId, openRoom);
  }

  const joinRoomHandler = () => {
    joinRoom(courseId, openRoom, handleRejected);
  }

  return (
      <Card
      sx={{ minWidth: 275, p: 1, mb: 1 }}>
          <CardContent>
              <Typography variant="h5" component="div">
                  {`${name}(${courseId})`}
              </Typography>
              <Typography 
                sx={{ 
                  my: 1.5,
                  fontSize: 14
                }}
                color="text.secondary">
              {professor} | {place}
              </Typography>
              <Typography variant="body2">
                {`${timeFormat(startTime)} ~ ${timeFormat(endTime)}`}
              </Typography>
          </CardContent>
          <CardActions
            sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
            variant="text"
            component={RouterLink}
            to={`/courses/${id}`}
            >
              더보기
            </Button>
            {
                      user.userType === 'STUDENT'
                      ?
                      (
                        classOpen
                        ?
                        <Button
                          variant="contained"
                          onClick={joinRoomHandler}
                          component={RouterLink}
                          to={'/classroom'}
                          sx={{ width: { xs: '24%', md: '22%' } }}>
                            참가하기
                        </Button>
                        :
                        <Button
                          variant="contained"
                          disabled
                          sx={{ width: { xs: '24%', md: '22%' } }}>
                            {timeLeft()}
                        </Button>
                      )
                      :
                      (
                      classOpen
                      ?
                      <Button
                        variant="contained"
                        onClick={createRoomHandler}
                        component={RouterLink}
                        to={'/classroom'}
                        sx={{ width: { xs: '24%', md: '22%' } }}>
                          생성하기
                      </Button>
                      :
                      <Button
                      variant="contained"
                      disabled
                      sx={{ width: { xs: '24%', md: '22%' } }}>
                        {timeLeft()}
                      </Button>
                      )
                    }
          </CardActions>
      </Card>
  );
}
