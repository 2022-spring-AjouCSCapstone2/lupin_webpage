import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { ClassRoom as ClassRoomProps } from '../../slices/classRoom';
import { SocketContext, SocketEventProps } from '../context/socket';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    py: 3,
    px: 4 
};

export default function QuizModal() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(new Array(5).fill(''));
    const [answer, setAnswer] = useState(0);
    
    const classRoom = useSelector<ReducerType, ClassRoomProps>((state) => state.classRoom);
    const { roomId } = classRoom;
    
    const socketEvents = useContext<SocketEventProps>(SocketContext);
    const { spreadQuiz } = socketEvents;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const titleHandler = (e: any) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const optionHandler = (e: any) => {
        e.preventDefault();
        const newOptions = [...options].map((option, index) => {
            if(index === Number(e.target.id)) return e.target.value;
            else return option;
        });
        setOptions(newOptions);
    }

    const handleAnswer = (e: any) => {
        e.preventDefault();
        setAnswer(e.target.value);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();

        const list = [...options]
                    .map((option, index) => {
                        return {
                            content: option,
                            isAnswer: index === answer
                        };
                    })
                    .filter((option) => {
                        return option.content !== '';
                    });
        if(list.length < 2) {
            alert('선택지 수가 너무 적습니다.');
            return;
        }

        const newAnswer = list.findIndex((option) => option.isAnswer);
        if(newAnswer === -1) {
            alert('선택지 중에 정답이 없습니다.');
            return;
        }
                        
        const quizData = {
            roomId,
            content: title,
            list: list.map((option, index) => {
                return {
                    no: index,
                    content: option.content
                };
            }),
            answer: newAnswer
        }
        spreadQuiz(quizData);
        handleClose();
    }

    return (
        <Box>
            <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ mr: 3 }}
            >
                퀴즈 제출하기
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component='form' onSubmit={submitHandler} sx={style}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ fontSize: 24, mr: 2 }}>Q.</Typography>
                        <TextField
                        variant="standard"
                        autoFocus
                        fullWidth
                        placeholder="질문을 적어주세요(선다형 문제 - 보기 두 개 이상)"
                        onChange={titleHandler}
                        sx={{ my: 2 }} />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <TextField
                        inputProps={{ maxLength: 30 }}
                        onChange={optionHandler}
                        id="0"
                        label="질문1"
                        variant='outlined'
                        sx={{ display: 'flex', mb: 1 }} />
                        <TextField
                        inputProps={{ maxLength: 30 }}
                        onChange={optionHandler}
                        id="1"
                        label="질문2"
                        variant='outlined'
                        sx={{ display: 'flex', mb: 1 }} />
                        <TextField
                        inputProps={{ maxLength: 30 }}
                        onChange={optionHandler}
                        id="2"
                        label="질문3"
                        variant='outlined'
                        sx={{ display: 'flex', mb: 1 }} />
                        <TextField
                        inputProps={{ maxLength: 30 }}
                        onChange={optionHandler}
                        id="3"
                        label="질문4"
                        variant='outlined'
                        sx={{ display: 'flex', mb: 1 }} />
                        <TextField
                        inputProps={{ maxLength: 30 }}
                        onChange={optionHandler}
                        id="4"
                        label="질문5"
                        variant='outlined'
                        sx={{ display: 'flex', mb: 1 }} />
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">정답은?</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={answer}
                            label="Age"
                            onChange={handleAnswer}
                            >
                            <MenuItem value={0}>질문1</MenuItem>
                            <MenuItem value={1}>질문2</MenuItem>
                            <MenuItem value={2}>질문3</MenuItem>
                            <MenuItem value={3}>질문4</MenuItem>
                            <MenuItem value={4}>질문5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button type="submit" variant="contained">퀴즈 제출하기</Button>  
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}