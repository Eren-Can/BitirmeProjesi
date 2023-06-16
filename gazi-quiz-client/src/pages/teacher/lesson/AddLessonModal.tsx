import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { errorMessage, successMessage } from '../../../core/toastify';
import { addLessonService } from '../../../services/lessonService';
import AddLessonRequest from '../../../models/lesson/request/AddLessonRequest';
import CustomBackdrop from '../../../components/CustomBackdrop';

interface AddLessonModalProps {
    open: boolean;
    handleClose: () => void;
    onRefreshLesson: () => void;
}

const AddLessonModal = (props: AddLessonModalProps) => {
    const { handleClose, open, onRefreshLesson } = props;

    const [state, setState] = useState({
        lesson: {} as AddLessonRequest,
        loading: false,

    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState((prev) => ({ ...prev, lesson: { ...prev.lesson, name: e.target.value } }));
    };

    const addLesson = async () => {
        if(state.lesson.name.length < 2){
            errorMessage('Ders adı 2 karakterden uzun olmalıdır.');
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));

        try {
            await addLessonService(state.lesson);
            successMessage('Ders Eklendi!');
        } catch (err) {
            errorMessage('Hatalı işlem');
        }

        handleClose();
        onRefreshLesson();
        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <Typography variant='h2'>Ders Ekle</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    value={state.lesson.name}
                    onChange={handleChange}
                    autoFocus
                    margin='dense'
                    label='Ders Adı'
                    fullWidth
                    variant='standard'
                    required
                />
            </DialogContent>
            <DialogActions sx={{ padding: '20px 24px' }}>
                <Button onClick={handleClose}>Kapat</Button>
                <Button onClick={addLesson} variant='contained'>
                    Ekle
                </Button>
            </DialogActions>
            {state.loading && <CustomBackdrop />}
        </Dialog>
    );
};

export default AddLessonModal;
