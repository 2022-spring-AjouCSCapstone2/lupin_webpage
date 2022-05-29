import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { QuizAnswerProps, ReceivedQuizDataProps } from '../context/socket';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 600,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5
};

interface ModalProps {
    open: boolean,
    quizData: ReceivedQuizDataProps | null,
    submitQuiz: (data: QuizAnswerProps) => void
}

export default function QuizModal({ open, quizData, submitQuiz }: ModalProps) {
    const [answer, setAnswer] = useState<number | null>(null);

    if(quizData === null) return <div></div>;
    const { content: title, quizLists, id: quizId } = quizData as ReceivedQuizDataProps;    

    const answerHandler = (e: any) => {
        e.preventDefault();
        setAnswer(e.target.value);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        if(answer === null) {
            alert('답을 선택해주세요.');
            return;
        }
        const data = {
            quizId,
            answer
        };
        submitQuiz(data);
    }

    return (
        <Box>
            <Modal open={open}>
                <Box
                component='form'
                onSubmit={submitHandler}
                sx={style}>
                    <Box sx={{ py: 3, px: 4 }}>
                        <Typography
                        variant="h6"
                        component="h2">
                            {`Q. ${title}`}
                        </Typography>
                        <Box sx={{ my: 2 }}>
                            <FormControl>
                                <RadioGroup
                                    onChange={answerHandler}
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group">
                                    {
                                        quizLists.map((quizOption, index) => <FormControlLabel
                                        key={index}
                                        value={quizOption.no}
                                        control={<Radio />}
                                        label={quizOption.content} />)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit" variant="contained">퀴즈 응답하기</Button>  
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}