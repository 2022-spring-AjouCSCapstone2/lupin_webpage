import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PostDataProps } from './PostBoard';

export default function PostCard({ id, title, content }: PostDataProps) {
    return (
        <Box sx={{ py: 3, px: 5, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 18, mb: 2 }}>{title}</Typography>
            <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary">
                {content}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Typography sx={{ fontSize: 12, display: 'block' }}>댓글 11</Typography>
            </Box>
        </Box>
    );
}