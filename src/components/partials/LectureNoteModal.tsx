import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

interface SummaryProps {
    keyword: string,
    text: string
}

interface LectureNoteProps {
    name: string,
    type: string,
    textData: string | null,
    objectData: SummaryProps | null
}

export default function LectureNoteModal({ name, type, textData, objectData }: LectureNoteProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <ListItem disablePadding>
                <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>
                {
                    type === 'object' && objectData !== null
                    ?
                    <Box sx={{ mt: 4 }}>
                        <Typography sx={{ mb: 1}}>-----keywords-----</Typography>
                        <Typography sx={{ mb: 2}}>{objectData.keyword}</Typography>
                        <Typography sx={{ mb: 1}}>-----summary-----</Typography>
                        <Typography sx={{ mb: 2}}>{objectData.text}</Typography>
                    </Box>
                    :
                    <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                        {
                            textData === null
                            ?
                            null
                            :
                            (
                                type === 'link'
                                ?
                                <a href={textData}>링크를 통해 다운 받으세요.</a>
                                :
                                textData
                            )
                        }                    
                    </Typography>
                }
                </Box>
            </Modal>
        </Box>
    )
}