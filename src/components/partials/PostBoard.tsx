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

    // const [currentComments, setCurrentComments] = useState<CommentProps[] | null>(null);
    const [currentComments, setCurrentComments] = useState<CommentProps[]>([]);
    const [newComment, setNewComment] = useState('');

    const enterPost = (data: CurrentPostProps) => {
        setCurrentPost(data);
        // setCurrentComments(data.comments);
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
            const comment = { id: 111999, content: newComment, user: { name: user.name } };
            setCurrentComments([...currentComments, comment]);
            const commentInput = document.getElementById('commentInput') as HTMLInputElement;
            commentInput.value = '';

            // const { id, content, user: { name } } = res.data;
            // const comment = { id, content, user: { name } };
            // if(currentComments !== null) setCurrentComments([...currentComments, comment]);
            // else setCurrentComments([comment]);
        })
        .catch((error) => alert('댓글을 달지 못했습니다.'));
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
                        {
                            postType === 'NOTICE'
                            ?
                            null
                            :
                            <Box>
                                <Typography
                                sx ={{ fontSize: 14, mb: 2, pl: 0.5 }}
                                >{`댓글 ${currentComments.length}`}</Typography>
                                <Box component='form' onSubmit={submitHandler}>
                                    <TextField
                                    id="commentInput"
                                    fullWidth
                                    placeholder='댓글을 남겨보세요'
                                    onChange={inputHandler}
                                    sx={{ mb: 2 }}
                                    ></TextField>
                                    <Button
                                    type="submit"
                                    variant='outlined'>댓글</Button>
                                </Box>
                                <Box id="commentBox" sx={{ mt: 3 }}>
                                    {
                                        currentComments !== null
                                        ?
                                        currentComments
                                        .reverse()
                                        .map((comment, index) => <Comment key={index} comment={comment} />)
                                        :
                                        null
                                    }
                                </Box>
                            </Box>
                        }
                    </Card>
                </Box>
                :
                <Box id="list">
                  {
                        (postType === 'FREE' || user.userType === 'PROFESSOR')
                        ?
                        <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`/courses/${id}/post/${postType}`}
                        sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            width: '100%',
                            mb: 2
                            }}
                        >
                                글쓰기
                        </Button>
                        :
                        null
                    }
                    <Card>
                        {
                            posts
                            ?.reverse()
                            .map((post) => {
                                const postCardData = {
                                    id: post.id,
                                    title: post.title,
                                    content: post.content,
                                    comments: post.comments,
                                    postType,
                                    enterPost
                                }
                                return <PostCard postCardData={postCardData} postType={postType} key={post.id}/>
                            })
                            .reduce((acc: (JSX.Element[] | null), cur, index) => 
                                acc === null
                                ? [cur]
                                : [...acc, <Divider key={index}></Divider>, cur], null)
                        }
                    </Card>
                </Box>
            }
        </Container>
    );
}