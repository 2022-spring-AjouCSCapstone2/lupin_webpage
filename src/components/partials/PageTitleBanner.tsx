import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PropTypes {
    props: {
        title: string,
        desc: string,
        isTabBelow: boolean
    };
}

export default function PageTitleBanner({ props }: PropTypes) {
    const { title, desc, isTabBelow } = props;
    const mb = isTabBelow ? 0 : 5;
    console.log(isTabBelow);
    console.log(mb);
    const height = isTabBelow ? 276 : 320;
    return(
        <Box sx={{ backgroundColor: 'white', mb }}>
            <Container
                sx={{
                    height,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}>
                <Typography sx={{ fontSize: 48, fontWeight: 700 }}>{title}</Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#848484' }}>{desc}</Typography>
            </Container>
        </Box>
    );
}