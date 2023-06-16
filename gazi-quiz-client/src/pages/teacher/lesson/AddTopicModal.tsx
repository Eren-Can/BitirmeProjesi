import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { errorMessage, successMessage } from '../../../core/toastify';
import { addTopicService } from '../../../services/topicService';
import AddTopicRequest from '../../../models/topic/request/AddTopicRequest';
import CustomBackdrop from '../../../components/CustomBackdrop';

interface AddTopicModalProps {
    open: boolean;
    handleClose: () => void;
    lessonId: string;
}

const AddTopicModal = (props: AddTopicModalProps) => {
    const { handleClose, open, lessonId } = props;

    const [state, setState] = useState({
        topic: {
            lessonId,
        } as AddTopicRequest,
        loading: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState((prev) => ({ ...prev, topic: { ...prev.topic, name: e.target.value } }));
    };

    const addTopic = async () => {
        console.log("a");
        if (state.topic.name.length < 2) {
            errorMessage('Konunun adı 2 karakterden uzun olmalıdır.');
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));

        try {
            await addTopicService(state.topic);
            successMessage('Konu Eklendi!');
        } catch (err) {
            errorMessage('Konu Eklenemedi!');
        }

        handleClose();
        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <Typography variant='h2'>Konu Ekle</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin='dense'
                    label='Konu Adı'
                    fullWidth
                    variant='standard'
                    value={state.topic.name}
                    onChange={handleChange}
                    required
                />
            </DialogContent>
            <DialogActions sx={{ padding: '20px 24px' }}>
                <Button onClick={handleClose}>Kapat</Button>
                <Button onClick={addTopic} variant='contained'>
                    Ekle
                </Button>
            </DialogActions>
            {state.loading && <CustomBackdrop />}
        </Dialog>
    );
};

export default AddTopicModal;
