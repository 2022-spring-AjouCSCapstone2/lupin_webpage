import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {   
  Link as RouterLink,
 } from 'react-router-dom';
 import { useState, useEffect } from 'react';
import axios from 'axios';
import { LOCAL_URL } from '../../variables';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { Courses } from '../../slices/courses';
import PostCard from './PostCard';

interface PostBoardProps {
    id: string
}

export interface PostDataProps {
    id: string,
    title: string,
    content: string
}

export default function PostBoard({ id }: PostBoardProps) {
    const [posts, setPosts] = useState<PostDataProps[]>();

    const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
    const course = courses.find((course) => course.id === Number(id))
    const courseId = course?.courseId;

    useEffect(() => {
        axios
        .get(LOCAL_URL + `/posts/courses/${courseId}`, {withCredentials: true})
        .then((res) => {
            console.log(res);
            if(posts === undefined) setPosts([...res.data]);
            else setPosts([...posts, ...res.data]);
        })
        .catch((error) => alert('게시물을 불러오는데 실패했습니다.'));
    }, []);

    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ mb: 4 }}>
                {
                    posts
                    ?.map((post) => <PostCard key={post.id} id={post.id} title={post.title} content={post.content} />)
                    .reduce((acc: (JSX.Element[] | null), cur, index) => 
                        acc === null
                        ? [cur]
                        : [...acc, <Divider key={index}></Divider>, cur], null)
                }
            </Card>
            <Button
            variant="contained"
            component={RouterLink}
            to={`/courses/${id}/post`}
            sx={{
                fontSize: 18,
                fontWeight: 700,
                width: '100%'
                }}
            >
                    글쓰기
            </Button>
        </Container>
    );
}