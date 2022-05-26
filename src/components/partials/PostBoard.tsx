import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {   
  Link as RouterLink,
 } from 'react-router-dom';

interface PostBoardProps {
    id: string
}

export default function PostBoard({ id }: PostBoardProps) {
    return (
        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ mb: 4 }}>
                <Box sx={{ py: 3, px: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 18, mb: 2 }}>웹과제 10번 팁 공유합니다.</Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary">
                        웹과제 10번에서 헤매는 분들이 많은 것 같아 문제 접근하는 팁 공유합니다. 우선 처음에 조건을 보면 곡면을 사용해서 풀어야 한다는 것을 알 수 있습니다. 문제에서 주어진 벡터 v = 3x + ...
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Typography sx={{ fontSize: 12, display: 'block', mr: 3 }}>좋아요 19</Typography>
                        <Typography sx={{ fontSize: 12, display: 'block' }}>댓글 11</Typography>
                    </Box>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 18, mb: 2 }}>CORS 에러 해결에 관해서</Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary">
                        웹 서버 개발하시는 분들께 질문드립니다. CORS 에러를 프록시로 해결할 수도 있고 origin 설정을 해줄 수도 있던데 보통 어떤 방식으로 하시나요? 각각 장단점이 있는 것 같던데 저는 어느 쪽이 나은 지 잘 모르겠더라고요.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Typography sx={{ fontSize: 12, display: 'block', mr: 3 }}>좋아요 0</Typography>
                        <Typography sx={{ fontSize: 12, display: 'block' }}>댓글 3</Typography>
                    </Box>
                </Box>
                <Divider></Divider>
                <Box sx={{ py: 3, px: 5, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 18, mb: 2 }}>오늘 교수님 내주신 과제 제가 이해한 게 맞나요?</Typography>
                    <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary">
                        보고서 총 다섯 장이고 그 중 표지 한 장, 참고문헌 한 장. 수요일까지 제출. 맞나요?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Typography sx={{ fontSize: 12, display: 'block', mr: 3 }}>좋아요 0</Typography>
                        <Typography sx={{ fontSize: 12, display: 'block' }}>댓글 5</Typography>
                    </Box>
                </Box>
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