import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface CommentProps {
    id: number,
    content: string
    user: {
        name: string
    }
}

interface CommentBoxProps {
    comment: CommentProps
}

export default function Comment({ comment: { id, user: { name }, content } }: CommentBoxProps) {
    return (
        <Box
        key={id}
        sx={{
            backgroundColor: 'aliceblue',
            borderRadius: 1,
            p: 2,
            mb: 2
            }}>
                <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    mb: 2
                }}>{name}</Typography>
                <Typography>{content}</Typography>
        </Box>
    )
}