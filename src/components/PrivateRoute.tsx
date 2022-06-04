import {
    Route,
    Switch,
} from 'react-router-dom';
import Box from "@mui/material/Box";
import HeaderNav from './partials/HeaderNav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import NewPost from './pages/NewPost';
import Footer from './partials/Footer';
import ScrollToTop from './modules/ScrollToTop';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerType } from '../rootReducer';
import ClassRoom from './pages/ClassRoom';
import { QuizAnswerProps, ReceivedQuizDataProps, SocketContext } from './context/socket';
import { useContext, useState } from 'react';
import { ClassRoom as ClassRoomProps, exitClassRoom } from '../slices/classRoom';
import { QuestionProps, setQuestions, emptyQuestions } from "../slices/questionList";
import { useDispatch } from 'react-redux';
import QuizModal from "./partials/QuizModal";
import { useHistory } from "react-router-dom";
import { User } from '../slices/user';
import Introduce from './pages/Introduce';

export default function PrivateRoute() {
    const loggedIn = useSelector<ReducerType>((state) => state.loggedIn);
    const user = useSelector<ReducerType, User>((state) => state.user);
    const classRoom = useSelector<ReducerType, ClassRoomProps>((state) => state.classRoom);
    const { connectUserSocket, answerQuiz } = useContext(SocketContext);
    
    const [socketConnected, setSocketConnected] = useState(false);

    const dispatch = useDispatch();
    
    const history = useHistory();
    
    const [modalOpen, setModalOpen] = useState(false);
    const [quiz, setQuiz] = useState<ReceivedQuizDataProps | null>(null);

    const handleClassRoomShutDown = () => {
        if(user.userType === 'STUDENT') {
            alert('강의자에 의해 수업이 종료되었습니다.');
            dispatch(emptyQuestions());
            dispatch(exitClassRoom());
            history.push('/');
        }
    }

    const receiveQuestion = (questionData: QuestionProps) => {
        dispatch(setQuestions({ questionData, point: false }));
    }

    const receiveQuiz = (quizData: ReceivedQuizDataProps) => {
        setQuiz(quizData);
        setModalOpen(true);
    }

    const submitQuiz = (data: QuizAnswerProps) => {
        answerQuiz(data);
        setModalOpen(false);
    }

    if(loggedIn && !socketConnected) {
        setSocketConnected(true);
        connectUserSocket(receiveQuestion, receiveQuiz, handleClassRoomShutDown);
    }

    return (
        <Route render={
            () => loggedIn
            ?
            (
                classRoom.name
                ?
                <Box>
                    <QuizModal open={modalOpen} quizData={quiz} submitQuiz={submitQuiz} />
                    <Route path="/classroom" exact component={ClassRoom} />
                </Box>
                :
                (
                <Box>                    
                    <ScrollToTop />
                    <HeaderNav />
                    <Box sx={{ mt: 8, pb: 10, backgroundColor: '#f9fafb' }}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/profile" exact component={Profile} />
                            <Route path="/introduce" exact component={Introduce} />
                            <Route path="/courses" exact component={Courses} />
                            <Route path="/courses/:id" exact component={CourseDetails} />
                            <Route path="/courses/:id/post/:postType" exact component={NewPost} />
                        </Switch>
                    </Box>
                    <Footer />
                </Box>
                )
            )
            :
            (
                <Redirect to={{ pathname: '/login' }} />
            )
        } />
    )
}