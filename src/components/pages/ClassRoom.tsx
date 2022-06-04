import {
    Button,
    Typography,
    List,
    CircularProgress,
    Modal,
    Box,
    TextField
} from "@mui/material";
import { ReducerType } from '../../rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ClassRoom as ClassRoomProps, exitClassRoom } from '../../slices/classRoom';
import { useHistory } from "react-router-dom";
import { SocketContext, SocketEventProps } from '../context/socket';
import { useContext, useEffect, useRef, useState } from 'react';
import Questions from "../partials/Questions";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { QuestionProps, QuestionListProps, setQuestions, emptyQuestions } from "../../slices/questionList";
import { User } from "../../slices/user";
import MakeQuizModal from "../partials/MakeQuizModal";
import axios from "axios";
import { SERVER_URL } from "../../variables";

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const audioChunks = useRef<Blob[]>([]);
    
    let stream = useRef<MediaStream>();
    let mediaRecorder = useRef<MediaRecorder>();
    
    const record = async () => {
        stream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
        });
    
        if(stream !== undefined) {
            mediaRecorder.current = new MediaRecorder(stream.current);     
            
            mediaRecorder.current.start(100);

            mediaRecorder.current.addEventListener("dataavailable", event => {
                audioChunks.current.push(event.data);
            });
        }
    }

    const removeClassData = () => {
        dispatch(exitClassRoom());
        leaveRoom({ roomId });
        dispatch(emptyQuestions());
        history.push('/');
    }

    const handleExit = () => {
        if(window.confirm('정말 퇴장하시겠습니까?')) {        
            if(user.userType === 'PROFESSOR') {
                if(mediaRecorder.current !== undefined) {
                    mediaRecorder.current.stop();
                    stream.current?.getTracks().forEach(track => track.stop());
                }
                handleOpen();
                const audioBlob = new Blob(audioChunks.current, { 'type' : 'audio/ogg; codecs=opus' });
                if(audioBlob) {
                    const formData = new FormData();
                    formData.append("audio", audioBlob);
                    axios
                    .post(SERVER_URL + `/courses/${courseId}/logs`, formData, { withCredentials: true})
                    .then((res) => {
                        console.log(res);
                        handleClose();
                        alert('녹음 파일이 업로드 되었습니다.');
                        removeClassData();
                    })
                    .catch((error) => {
                        console.log(error);
                        handleClose();
                        removeClassData();
                    });
                }
            } else {
                removeClassData();
            }
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

    useEffect(() => {
        if(user.userType === 'PROFESSOR') {
            record();
        }
    }, []);

    return (
        <Box sx={{ minWidth: '600px' }}>
            {/* Loading Modal */}
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CircularProgress 
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}/>
            </Modal>

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