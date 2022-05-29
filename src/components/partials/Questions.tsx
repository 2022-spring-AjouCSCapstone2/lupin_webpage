import { IconButton, ListItem, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Box from "@mui/material/Box";
import { QuestionListProps, updatePoint } from "../../slices/questionList";
import { ReducerType } from '../../rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { User } from "../../slices/user";
import { useContext } from 'react';
import { SocketContext, SocketEventProps } from '../context/socket';

interface QuestionsProps {
    question: QuestionListProps
}

export default function Questions({ question }: QuestionsProps) {
    const user = useSelector<ReducerType, User>((state) => state.user);
    const { userType } = user;
    const { questionData, point } = question;
    const { id, isAnonymous, content, user: { name } } = questionData;

    const socketEvents = useContext<SocketEventProps>(SocketContext);
    const { setPoints } = socketEvents;

    const dispatch = useDispatch();

    const addPointHandler = (e: any) => {
        e.preventDefault();
        if(!point) {
            if(id !== null) setPoints(id, true)
            dispatch(updatePoint({ questionData, point: true }));
        }
    }

    const minusPointHandler = (e: any) => {
        e.preventDefault();
        if(point) {
            if(id !== null) setPoints(id, false)
            dispatch(updatePoint({ questionData, point: false }));
        }
    }

    return (
            <ListItem
            sx={{
                backgroundColor: '#e2e0e0',
                display: 'flex',
                flexDirection: 'column',
                px: 4,
                py: 2,
                my: 2,
                borderRadius: 5
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2
                    }}>
                    <Typography
                    sx={{ textDecoration: 'underline' }}>
                        {
                            isAnonymous
                            ?
                            '익명'
                            :
                            name
                        }
                    </Typography>
                    {
                        userType === 'STUDENT'
                        ?
                        null
                        :
                        <Box>
                            <IconButton
                            onClick={addPointHandler}
                            sx={{
                                p: 0,
                                mr: 1,
                                color: point ? 'aliceblue' : 'gray'
                                }}>
                                <AddBoxIcon />
                            </IconButton>
                            <IconButton
                            onClick={minusPointHandler}
                            sx={{
                                p: 0,
                                color: point ? 'gray' : 'aliceblue'
                                }}>
                                <IndeterminateCheckBoxIcon />
                            </IconButton>
                        </Box>
                    }
                </Box>
                <Typography
                sx={{
                    width: '100%',
                    fontSize: 18
                    }}>{content}</Typography>
            </ListItem>
    );
}