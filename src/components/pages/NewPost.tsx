import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from '@mui/material/InputBase';
import { RouteComponentProps } from "react-router";
import { alpha, styled } from '@mui/material/styles';
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../variables";
import { useHistory } from 'react-router-dom';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { Courses } from "../../slices/courses";

interface MatchParams {
    id: string,
    postType: string
}

const PostInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #babfc4',
        fontSize: 18,
        display: 'block',
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
        ]),
        '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
        },
    },
}));

export default function NewPost({ match }: RouteComponentProps<MatchParams>) {
    const { params: { id, postType } } = match;

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    const courses = useSelector<ReducerType, Courses[]>((state) => state.courses);
    const course = courses.find((course) => course.id === Number(id))
    const courseId = course?.courseId;

    const titleHandler = (e: any) => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const contentHandler = (e: any) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        const body = {
            title: title.trim(),
            content: content.trim(),
            courseId,
        };
        const url = postType === 'FREE' ? '/posts' : '/posts/notices';
        axios
        .post(SERVER_URL + url, body, {withCredentials: true})
        .then((res) => {
            console.log(res);
            history.push(`/courses/${id}`);
        })
        .catch((error) => alert('게시물 등록에 실패했습니다.'))
    }

    return (
        <Container maxWidth="lg" sx={{ pt: 10 }}>
            <Card>
                <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: 44,
                    fontWeight: 700,
                    mt: 8,
                    mb: 8
                    }}>
                        글쓰기
                </Typography>
                <Container maxWidth="md" component="form" onSubmit={submitHandler}>
                    <PostInput
                    placeholder="제목을 적어주세요."
                    onChange={titleHandler}
                    inputProps={{
                        maxLength: 20
                    }}
                    sx={{ width: '100%', mb: 4 }} />
                    <PostInput
                    onChange={contentHandler}
                    inputProps={{
                        maxLength: 1000
                    }}
                    multiline={true}
                    rows={10}
                    sx={{ width: '100%', mb: 4 }} />
                    <Button
                    variant="contained"
                    type="submit"
                    sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        width: '100%',
                        mb: 10
                        }}
                    >등록</Button>
                </Container>
            </Card>
        </Container>
    );
}