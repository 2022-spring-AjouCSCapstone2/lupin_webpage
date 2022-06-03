import { Box, Container } from "@mui/material";
import PageTitleBanner from '../partials/PageTitleBanner';

const pageDataProps = {
    title: '소개',
    desc: '프로젝트 루팡을 소개합니다!',
    isTabBelow: false
};

export default function Introduce() {
    return (
        <Box>
            <PageTitleBanner props={pageDataProps} />            
            <Container maxWidth="md">
                <img src="/poster.jpg" alt="poster" title="poster" style={{width: '100%'}} />
            </Container>
        </Box>
    )
}