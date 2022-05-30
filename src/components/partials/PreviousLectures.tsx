import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import List from '@mui/material/List';
import LectureNoteModal from './LectureNoteModal';

export default function PreviousLectures() {
    const [triggered, setTriggered] = useState(false);

    const changer = (e: any) => {
        e.preventDefault();
        setTriggered(true);
    }

    const url = '#';

    const question = '교수님 블랙홀의 질량은 백색 왜성과 비교하면 어떤가요?';

    const script = '코로나19 예방 수칙입니다. 손을 자주 씻기 마스크 착용하기 기침할 땐 입과 코 가리기 발열 기침 인후통 등 증상 의심 시에는 1339 또는 보건소와 상담하시기 바랍니다';

    const summary = { 
        keyword: '기침',
        text: '코로나19 예방 수칙입니다. 손을 자주 씻기 마스크 착용하기 기침할 땐 입과 코 가리기 발열 기침 인후통 등 증상 의심 시에는 1339 또는 보건소와 상담하시기 바랍니다'
    };


    return (
        <Container maxWidth="md">
            {
                triggered
                ?
                <Card sx={{ py: 3, px: 5 }}>
                    <Typography>2022년 5월 18일 (수)</Typography>
                    <List>
                        <LectureNoteModal name='녹음 자료' type='link' textData={url} objectData={null} />
                        <LectureNoteModal name='질문 내용' type='text' textData={question} objectData={null} />
                        <LectureNoteModal name='수업 대본' type='text' textData={script} objectData={null} />
                        <LectureNoteModal name='수업 요약' type='object' textData={null} objectData={summary} />
                    </List>
                </Card>
                :
                <Card>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 18일 (수)</Typography>
                        <Button onClick={changer} variant="contained">GO</Button>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 16일 (월)</Typography>
                        <Button variant="contained">GO</Button>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 11일 (수)</Typography>
                        <Button variant="contained">GO</Button>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 09일 (월)</Typography>
                        <Button variant="contained">GO</Button>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 04일 (수)</Typography>
                        <Button variant="contained">GO</Button>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: 18 }}>2022년 5월 02일 (월)</Typography>
                        <Button variant="contained">GO</Button>
                    </Box>
                </Card>
            }
        </Container>
    );
}