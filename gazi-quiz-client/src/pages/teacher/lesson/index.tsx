import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import LessonCard from './LessonCard';
import Grid from '@mui/material/Grid';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useEffect, useState } from 'react';
import AddLessonModal from './AddLessonModal';
import { listLessonByTeacherService } from '../../../services/lessonService';
import { errorMessage } from '../../../core/toastify';
import LessonInfoResponse from '../../../models/lesson/response/LessonInfoResponse';
import CustomBackdrop from '../../../components/CustomBackdrop';

const Lesson = () => {
    const [state, setState] = useState({
        loading: false,
        lessons: [] as Array<LessonInfoResponse>,
        refreshLessons: false,
    });

    useEffect(() => {
        getLessons();
    }, [state.refreshLessons]);

    const onRefreshLesson = () =>
        setState((prev) => ({ ...prev, refreshLessons: !prev.refreshLessons }));

    // 1 - Add Lesson Modal
    const [openLessonModal, setOpenLessonModal] = useState(false);
    const handleOpenLessonModal = () => setOpenLessonModal(true);
    const handleCloseLessonModal = () => setOpenLessonModal(false);
    // 1 ---

    const getLessons = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listLessonByTeacherService();
            setState((prev) => ({ ...prev, lessons: response.data.data || [] }));
        } catch (err) {
            errorMessage('Dersler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <TeacherPageContainer
            title='Dersler'
            subtitle='Size ait tüm dersler listelenmiştir.'
            isButton
            buttonText='Ders Ekle'
            buttonIcon={<AddCircleOutlinedIcon />}
            onClick={handleOpenLessonModal}
        >
            <Grid container spacing={2}>
                {state.lessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                ))}
            </Grid>
            <AddLessonModal
                open={openLessonModal}
                handleClose={handleCloseLessonModal}
                onRefreshLesson={onRefreshLesson}
            />
            {state.loading && <CustomBackdrop />}
        </TeacherPageContainer>
    );
};

export default Lesson;
