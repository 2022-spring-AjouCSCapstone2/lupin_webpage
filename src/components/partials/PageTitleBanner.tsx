import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface PropTypes {
    props: {
        title: string,
        desc: string
    };
}

export default function PageTitleBanner({ props }: PropTypes) {
    const { title, desc } = props;
    return(
        <Box sx={{ backgroundColor: 'white', mb: 5 }}>
            <Container
                sx={{
                    height: 320,
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