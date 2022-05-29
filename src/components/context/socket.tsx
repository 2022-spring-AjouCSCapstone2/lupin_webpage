import { io, Socket } from "socket.io-client";
import { LOCAL_URL } from '../../variables';
import { createContext } from "react";
import { QuestionProps } from '../../slices/questionList';

let socket: Socket;

export interface SocketEventProps {
    createRoom: (courseId: string, openRoom: (roomId: string) => void) => void,
    connectUserSocket: (
        receiveQuestion: (question: QuestionProps) => void,
        receiveQuiz: (quizData: ReceivedQuizDataProps) => void) => void,
    leaveRoom: (roomId: string) => void,
    joinRoom: (courseId: string, openRoom: (roomId: string) => void, handleRejected: () => void) => void,
    makeQuestion: (
        { id, roomId, type, isAnonymous, content, courseId, user: { name } }: QuestionProps,
        addNewQuestion: (question: QuestionProps) => void) => void,
    setPoints: ( id: number, point: boolean ) => void,
    spreadQuiz: (quizData: QuizDataProps) => void,
    answerQuiz: (quizData: QuizAnswerProps) => void
}

interface QuizListProps {
    no: number,
    content: string
}

interface QuizDataProps {
    roomId: string,
    content: string,
    list: QuizListProps[],
    answer: number
}

interface QuizOptionProps {
    no: number,
    content: string,
    id: number
}

export interface ReceivedQuizDataProps {
    content: string,
    quizLists: QuizOptionProps[],
    id: number
}

export interface QuizAnswerProps {
    quizId: number,
    answer: number
}

export const socketEvents = {
    createRoom: (courseId: string, openRoom: (roomId: string) => void) => {
        socket.emit('createRoom', { courseId }, (roomId: string) => {
            console.log(roomId);
            if(roomId === 'Forbidden') alert('잘못된 요청입니다.');
            else if(roomId === 'Room already exists') alert('이미 존재하는 수업입니다.');
            else openRoom(roomId);
        });
    },
    connectUserSocket: (
        receiveQuestion: (question: QuestionProps) => void,
        receiveQuiz: (quizData: ReceivedQuizDataProps) => void) => {
        socket = io(LOCAL_URL, {withCredentials: true});

        socket.on("connect", () => {
            console.log('socket id', socket.id);
        });

        socket.on('newStudent', (data) => {
            console.log(data);
        });

        socket.on('newQuestion', (data) => {
            receiveQuestion(data);
        });
        
        socket.on('quiz', (data) => {
            console.log(data);
            receiveQuiz(data);
        });
    },
    leaveRoom: (roomId: string) => {
        socket.emit('leaveRoom', { roomId }, (response: string) => {
            if(response !== "success") alert('잘못된 접근입니다.');
        });
    },
    joinRoom: (courseId: string, openRoom: (roomId: string) => void, handleRejected: () => void) => {
        socket.emit('joinRoom', { courseId }, (roomId: string) => {
            if(roomId === "Forbidden") alert('잘못된 접근입니다.');
            else if(roomId === 'no course session opened') {
                alert('아직 수업이 열리지 않았습니다. 잠시 후에 다시 시도해주세요.');
                handleRejected();
            }
            else openRoom(roomId);
        });
    },
    makeQuestion: (
        { id, roomId, type, isAnonymous, content, courseId, user: { name } }: QuestionProps,
        addNewQuestion: (question: QuestionProps) => void) => {        
        socket.emit('question', { roomId, type, isAnonymous, content, courseId }, (response: string) => {
            if(response !== 'success') alert('질문이 정상적으로 전달되지 않았습니다.');
            else {
                console.log('질문을 전달했습니다.');
                addNewQuestion({ id, roomId, type, isAnonymous, content, courseId, user: { name } });
            }
        });
    },
    setPoints: ( id: number, point: boolean ) => {
        socket.emit('checkQuestion', { logId: id, point }, (response: string) => {
            if(response === 'Forbidden' || response === 'Failed') alert('잘못된 접근입니다.');
            else console.log('포인트 적용 완료!');
        });
    },
    spreadQuiz: (quizData: QuizDataProps) => {
        socket.emit('quiz', quizData, (response: string) => {            
            if(response === 'Forbidden' || response === 'Failed') alert('잘못된 접근입니다.');
            else console.log('퀴즈 출제 완료!');
        });        
    },
    answerQuiz: (quizData: QuizAnswerProps) => {
        socket.emit('quizAnswer', quizData, (response: string) => {     
            if(response === 'Forbidden') alert('잘못된 접근입니다.');
            else console.log('퀴즈 제출 완료!');
        });
    }
}

export const SocketContext = createContext(socketEvents);