import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { LectureDataProps } from './PreviousLectures';

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

interface LectureNoteProps {
    logData: LectureDataProps
}

export default function LectureNoteModal({ logData }: LectureNoteProps) {
    const { type, recordKey, script, summary, content } = logData;
    const [open, setOpen] = useState(false);

    const downloadRecordingHandler = (e: any) => {
        e.preventDefault();
        const newTab = recordKey ? window.open(recordKey, '_blank') : null;
        if(newTab) newTab.focus();
    }

    let name;
    let modalContent;
    switch (type) {
        case 'QUESTION':
            name = '질문 내용';
            modalContent = (
                <Box sx={{ mt: 4 }}>
                    <Typography>{content}</Typography>
                </Box>
            );
            break;
        case 'RECORDING':
            name = '녹음 자료';
            modalContent = (
                <Box sx={{ mt: 4 }}>
                    {
                        recordKey === null
                        ?
                        <Typography>링크가 소실되었습니다.</Typography>
                        :
                        <Typography
                        onClick={downloadRecordingHandler}
                        sx={{
                            color: 'blue',
                            textDecoration: 'underline',
                            cursor: 'pointer'                            
                        }}>이 곳에서 녹음 파일을 다운 받으세요.</Typography>
                    }
                </Box>
            );
            break;
        case 'SCRIPT':
            name = '수업 대본';
            modalContent = (
                <Box sx={{ mt: 4 }}>
                    <Typography>{script}</Typography>
                </Box>
            );
            break;
        case 'SUMMARY':
            name = '수업 요약';
            modalContent = (
                <Box sx={{ mt: 4 }}>
                    <Typography>{summary}</Typography>
                </Box>
            );
            break;
    }

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
                {modalContent}
                </Box>
            </Modal>
        </Box>
    )
}