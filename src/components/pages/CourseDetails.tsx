import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PageTitleBanner from '../partials/PageTitleBanner';
import TabPanel from '../partials/TabPanel';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { RouteComponentProps } from "react-router";
import { useState } from 'react';

interface MatchParams {
    id: string;
}

const pageDataProps = {
    title: '수업 정보',
    desc: '긴가민가 할 땐 다시 듣고! 잘 모르겠을 땐 물어보고!',
    isTabBelow: true
};

export default function CourseDetails({ match }: RouteComponentProps<MatchParams>) {
    const { params: { id }, path } = match;
    const [tabNumber, setTabNumber] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabNumber(newValue);
    };
    return(
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tabNumber} onChange={handleChange} centered>
                    <Tab label="수업 상세" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="이전 수업들" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="게시판" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="학생 관리" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                </Tabs>
            </Box>
            <Box>
                <TabPanel value={tabNumber} index={0}>
                    <Container maxWidth="md">
                        <Card sx={{ p: 3 }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontSize: 28, fontWeight: 700, mb: 3 }}>사이버보안캡스톤디자인(F108-1)</Typography>
                                <Typography sx={{ fontSize: 20, mb: 1 }}>담당 교수: 손태식</Typography>
                                <Typography sx={{ fontSize: 20, mb: 1 }}>이메일: tasikshon@ajou.ac.kr</Typography>
                                <Typography sx={{ fontSize: 20, mb: 1 }}>수업 시간: 월(15:00 ~ 19:30), 수(15:00 ~ 19:30)</Typography>
                                <Typography sx={{ fontSize: 20, mb: 1 }}>강의실: 종합설계동101</Typography>
                                <Typography sx={{ fontSize: 20 }}>내 포인트: 3</Typography>
                            </CardContent>
                        </Card>
                    </Container>
                </TabPanel>
                <TabPanel value={tabNumber} index={1}>
                    <Container maxWidth="md">
                        <Card>
                            <Box sx={{ py: 3, px: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: 18 }}>2022년 5월 18일 (수)</Typography>
                                <Button variant="contained">GO</Button>
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
                    </Container>
                </TabPanel>
                <TabPanel value={tabNumber} index={2}>
                    <Container maxWidth="md">
                        <Card>
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
                    </Container>
                </TabPanel>                
                <TabPanel value={tabNumber} index={3}>
                    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography sx={{ display: 'block', my: 10 }}>여기에 디자인 하시면 됩니다.</Typography>
                    </Container>
                </TabPanel>
            </Box>
        </Box>
    );
}