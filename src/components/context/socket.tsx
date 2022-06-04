import { io, Socket } from "socket.io-client";
import { SERVER_URL } from '../../variables';
import { createContext } from "react";
import { QuestionProps } from '../../slices/questionList';

let socket: Socket;

export interface SocketEventProps {
    createRoom: (courseId: string, openRoom: (roomId: string) => void) => void,
    connectUserSocket: (
        receiveQuestion: (question: QuestionProps) => void,
        receiveQuiz: (quizData: ReceivedQuizDataProps) => void,
        handleClassRoomShutDown: () => void
        ) => void,
    leaveRoom: ({ roomId }: LeaveRoomProps) => void,
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

interface SocketResponseProps {
    status: string,
    data: string
}

interface LeaveRoomProps {
    roomId: string
}

export const socketEvents = {
    createRoom: (courseId: string, openRoom: (roomId: string) => void) => {
        socket.emit('createRoom', { courseId }, ({ status, data }: SocketResponseProps) => {
            if(status === 'failed') alert(data);
            else openRoom(data);
        });
    },
    connectUserSocket: (
        receiveQuestion: (question: QuestionProps) => void,
        receiveQuiz: (quizData: ReceivedQuizDataProps) => void,
        handleClassRoomShutDown: () => void) => {
        socket = io(SERVER_URL, {withCredentials: true});

        // socket.on("connect", () => {
        //     console.log('socket id', socket.id);
        // });

        // socket.on('newStudent', (data) => {
        //     console.log(data);
        // });

        socket.on('newQuestion', (data) => {
            receiveQuestion(data);
        });
        
        socket.on('quiz', (data) => {
            // console.log(data);
            receiveQuiz(data);
        });

        socket.on('roomClosed', (data) => {
            handleClassRoomShutDown();
        });
    },
    leaveRoom: ({ roomId }: LeaveRoomProps) => {
        socket.emit('leaveRoom', { roomId }, ({ status, data }: SocketResponseProps) => {
            if(status === "failed") alert(data);
        });
    },
    joinRoom: (courseId: string, openRoom: (roomId: string) => void, handleRejected: () => void) => {
        socket.emit('joinRoom', { courseId }, ({ status, data }: SocketResponseProps) => {
            if(status === 'failed') {
                alert(data);
                handleRejected();
            }
            else openRoom(data);
        });
    },
    makeQuestion: (
        { id, roomId, type, isAnonymous, content, courseId, user: { name } }: QuestionProps,
        addNewQuestion: (question: QuestionProps) => void) => {
        socket.emit(
            'question',
            { roomId, type, isAnonymous, content, courseId },
            ({ status, data }: SocketResponseProps) => {
                if(status === 'failed') alert(data);
                else addNewQuestion({ id, roomId, type, isAnonymous, content, courseId, user: { name } });
        });
    },
    setPoints: ( id: number, point: boolean ) => {
        socket.emit('checkQuestion', { logId: id, point }, ({ status, data }: SocketResponseProps) => {
            if(status === 'failed') alert(data);
            // else console.log('포인트 적용 완료!');
        });
    },
    spreadQuiz: (quizData: QuizDataProps) => {
        socket.emit('quiz', quizData, ({ status, data }: SocketResponseProps) => {            
            if(status === 'failed') alert(data);
            // else console.log('퀴즈 출제 완료!');
        });        
    },
    answerQuiz: (quizData: QuizAnswerProps) => {
        socket.emit('quizAnswer', quizData, ({ status, data }: SocketResponseProps) => {     
            if(status === 'failed') alert(data);
            // else console.log('퀴즈 제출 완료!');
        });
    }
}

export const SocketContext = createContext(socketEvents);