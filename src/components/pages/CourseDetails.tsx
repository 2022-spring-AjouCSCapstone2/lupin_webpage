import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PageTitleBanner from '../partials/PageTitleBanner';
import TabPanel from '../partials/TabPanel';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CourseDescription from '../partials/CourseDescription';
import PreviousLectures from '../partials/PreviousLectures';
import PostBoard from '../partials/PostBoard';
import StatisticsTable from "../partials/StatisticsTable";
import { RouteComponentProps } from "react-router";
import { useState } from 'react';
import { ReducerType } from '../../rootReducer';
import { useSelector } from 'react-redux';
import { User } from '../../slices/user';

interface MatchParams {
    id: string;
}

const pageDataProps = {
    title: '수업 정보',
    desc: '긴가민가 할 땐 다시 듣고! 잘 모르겠을 땐 물어보고!',
    isTabBelow: true
};

export default function CourseDetails({ match }: RouteComponentProps<MatchParams>) {
    const { params: { id } } = match;
    const [tabNumber, setTabNumber] = useState(0);
    const user = useSelector<ReducerType, User>((state) => state.user);
    const { userType } = user;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabNumber(newValue);
    };
    
    return(
        <Box>
            <PageTitleBanner props={pageDataProps} />
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={tabNumber} onChange={handleChange} centered>
                    <Tab label="수업 상세" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="공지사항" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="강의 노트" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    <Tab label="게시판" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                    {
                        userType === 'PROFESSOR'
                        ?
                        <Tab label="학생 관리" sx={{ fontFamily: 'Jua', fontSize: 16 }} />
                        :
                        null
                    }
                </Tabs>
            </Box>
            <Box>
                {/* 수업 상세 */}
                <TabPanel value={tabNumber} index={0}>
                    <CourseDescription id={id} />
                </TabPanel>

                {/* 공지사항 */}
                <TabPanel value={tabNumber} index={1}>
                    <PostBoard id={id} postType="NOTICE" />
                </TabPanel>

                {/* 강의 노트 */}
                <TabPanel value={tabNumber} index={2}>
                    <PreviousLectures id={id} />
                </TabPanel>

                {/* 게시판 */}
                <TabPanel value={tabNumber} index={3}>
                    <PostBoard id={id} postType="FREE" />
                </TabPanel>

                {/* 학생 관리 */}
                <TabPanel value={tabNumber} index={4}>
                    <StatisticsTable id={id} />
                </TabPanel>
            </Box>
        </Box>
    );
}