import { Button, Typography, List } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ReducerType } from '../../rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ClassRoom as ClassRoomProps, exitClassRoom } from '../../slices/classRoom';
import { useHistory } from "react-router-dom";
import { SocketContext, SocketEventProps } from '../context/socket';
import { useContext, useEffect, useState } from 'react';
import Questions from "../partials/Questions";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { QuestionProps, QuestionListProps, setQuestions, emptyQuestions } from "../../slices/questionList";
import { User } from "../../slices/user";
import MakeQuizModal from "../partials/MakeQuizModal";

export default function ClassRoom() {    
    const user = useSelector<ReducerType, User>((state) => state.user);
    const { name: username, id, userType } = user;
    const classRoom = useSelector<ReducerType, ClassRoomProps>((state) => state.classRoom);
    const { name, courseId, roomId } = classRoom;
    const questionList = useSelector<ReducerType, QuestionListProps[]>((state) => state.questionList);
    const history = useHistory();
    const dispatch = useDispatch();    
    const socketEvents = useContext<SocketEventProps>(SocketContext);
    const { leaveRoom, makeQuestion } = socketEvents;
    const [question, setQuestion] = useState('');
    const [checked, setChecked] = useState(true);

    const handleExit = () => {
        if(window.confirm('정말 퇴장하시겠습니까?')) {
            dispatch(exitClassRoom());
            leaveRoom({ roomId });
            dispatch(emptyQuestions());
            history.push('/');
        }
    }

    const inputHandler = (e: any) => {
        e.preventDefault();
        setQuestion(e.target.value);
    }

    const switchHandler = (e: any) => {
        e.preventDefault();
        setChecked(e.target.checked);
    }

    const addNewQuestion = (questionData: QuestionProps) => {
        dispatch(setQuestions({ questionData, point: false }));
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        const body = {
            id: null,
            roomId,
            type: 'QUESTION',
            isAnonymous: checked,
            content: question,
            courseId,
            user: {
                name: username,
                id
            }
        };        
        makeQuestion(body, addNewQuestion);
        const input = document.getElementById('questionInput') as HTMLInputElement;
        setQuestion('');
        if(input !== null) input.value = '';
    }

    useEffect(() => {      
        window.scrollTo(0, 100000);
    }, [questionList])

    return (
        <Box sx={{ minWidth: '600px' }}>
            <Box
            sx={{
                zIndex: 10,
                backgroundColor: 'aliceblue',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box',
                height: '15vh',
                position: 'fixed',
                top: 0,
                minWidth: '800px',
                px: { xs: 10, md: 25 }
            }}
            >
                <Typography
                sx={{ fontSize: 20 }}
                >{`${name}(${courseId})`}</Typography>
                <Box sx={{ display: 'flex' }}>
                    {
                        userType === 'PROFESSOR'
                        ?
                        <MakeQuizModal />
                        :
                        null
                    }
                    {
                        userType === 'PROFESSOR'
                        ?                        
                        <Button
                        variant="contained"
                        onClick={handleExit}
                        >
                            수업 종료하기
                        </Button>
                        :
                        <Button
                        variant="contained"
                        onClick={handleExit}
                        >
                            퇴장하기
                        </Button>
                    }
                </Box>
            </Box>
            <Box sx={{ px: 25, pt: 15, zIndex: 1, mt: 50 }}>
                <List id="questionList" sx={{ pb: 15, boxSizing: 'border-box' }}>
                    {questionList.map((q, i) => <Questions key={i} question={q} />)}
                </List>
            </Box>
            {
                userType === 'PROFESSOR'
                ?
                <Box sx={{
                    width: '100%',
                    height: '18vh',
                    backgroundColor: 'aliceblue',
                    zIndex: 10,
                    position: 'fixed',
                    bottom: 0,
                    minWidth: '800px'
                }}></Box>
                :
                <Box
                component='form'
                onSubmit={submitHandler}
                sx={{
                        zIndex: 10,
                        backgroundColor: 'aliceblue',
                        height: '18vh',
                        width: '100%',
                        position: 'fixed',
                        bottom: 0,
                        minWidth: '800px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'start',
                    }}>
                        <Box sx={{ width: '100%', px: { xs: 10, md: 25 } }}>
                            <FormControlLabel
                            control={<Switch                    
                                checked={checked}
                                onChange={switchHandler} />}
                            label="익명" />
                            <TextField
                            fullWidth
                            id="questionInput"
                            inputProps={{
                                style: {
                                marginBottom: 0
                                }
                            }}
                            onChange={inputHandler}
                            placeholder="질문하기" />
                        </Box>
                </Box>
            }
        </Box>
    )
}