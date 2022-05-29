import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {   
  Link as RouterLink,
 } from 'react-router-dom';
 import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../variables';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { Courses } from '../../slices/courses';
import PostCard from './PostCard';
import { TextField, Typography } from '@mui/material';
import Comment, { CommentProps }from './Comment';
import { User } from '../../slices/user';

interface PostBoardProps {
    id: string,
    postType: string
}

export interface PostDataProps {
    id: string,
    title: string,
    content: string,
    comments: CommentProps[]
    enterPost: (data: CurrentPostProps) => void
}

export interface CurrentPostProps {
    id: string,
    title: string,
    content: string,
    comments: CommentProps[],
    commentsNumber: number
}

export default function PostBoard({ id, postType }: PostBoardProps) {
    const [posts, setPosts] = useState<PostDataProps[]>();
    const [currentPost, setCurrentPost] = useState<CurrentPostProps | null>(null);
    
    const user = useSelector<ReducerType, User>((state) => state.user);

    const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
    const course = courses.find((course) => course.id === Number(id))
    const courseId = course?.courseId;

    const [newComment, setNewComment] = useState('');

    const enterPost = (data: CurrentPostProps) => {
        setCurrentPost(data);
    }

    const inputHandler = (e: any) => {
        e.preventDefault();
        setNewComment(e.target.value);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        if(currentPost === null) {
            alert('잘못된 접근입니다.');
            return;
        }
        const body = {
            postId: Number(currentPost.id),
            content: newComment
        }
        axios
        .post(SERVER_URL + '/posts/comments', body, {withCredentials: true})
        .then((res) => {
            console.log(res);
        })
        .catch((error) => alert('댓글을 다는데 실패했습니다.'));
    }

    useEffect(() => {
        const url = postType === 'FREE' ? `/posts/courses/${courseId}` : `/posts/courses/${courseId}?postType=NOTICE`
        axios
        .get(SERVER_URL + url, {withCredentials: true})
        .then((res) => {
            console.log(res);
            if(posts === undefined) setPosts([...res.data]);
            else setPosts([...posts, ...res.data]);
        })
        .catch((error) => alert('게시물을 불러오는데 실패했습니다.'));
    }, []);

    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
            {
                currentPost !== null
                ?
                <Box id="individual">
                    <Card sx={{ p: 3 }}>
                        <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 700,
                            mb: 3
                        }}>{currentPost.title}</Typography>
                        <Typography
                        sx={{ pb: 10 }}
                        >{currentPost.content}</Typography>
                        <Box>
                            <Typography
                            sx ={{ fontSize: 14, mb: 2, pl: 0.5 }}
                            >{`댓글 ${currentPost.commentsNumber}`}</Typography>
                            <Box component='form' onSubmit={submitHandler}>
                                <TextField
                                fullWidth
                                placeholder='댓글을 남겨보세요'
                                onChange={inputHandler}
                                sx={{ mb: 2 }}
                                ></TextField>
                                <Button
                                type="submit"
                                variant='outlined'>댓글</Button>
                            </Box>
                            <Box sx={{ mt: 3 }}>
                                {
                                    currentPost.commentsNumber > 0
                                    ?
                                    currentPost.comments
                                    .map((comment, index) => <Comment key={index} comment={comment} />)
                                    :
                                    null
                                }
                            </Box>
                        </Box>
                    </Card>
                </Box>
                :
                <Box id="list">
                    <Card sx={{ mb: 4 }}>
                        {
                            posts
                            ?.map((post) =>
                            <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            comments={post.comments}
                            enterPost={enterPost}
                            />)
                            .reduce((acc: (JSX.Element[] | null), cur, index) => 
                                acc === null
                                ? [cur]
                                : [...acc, <Divider key={index}></Divider>, cur], null)
                        }
                    </Card>
                    {
                        (postType === 'FREE' || user.userType === 'PROFESSOR')
                        ?
                        <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/courses/${id}/post/${postType}`}
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            width: '100%'
                            }}
                        >
                                글쓰기
                        </Button>
                        :
                        null
                    }
                </Box>
            }
        </Container>
    );
}