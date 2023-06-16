import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import { useParams } from 'react-router-dom';
import { errorMessage, successMessage } from '../../../core/toastify';
import { useState, useEffect } from 'react';
import CustomBackdrop from '../../../components/CustomBackdrop';
import AddQuizRequest from '../../../models/quiz/request/AddQuizRequest';
import TopicInfoResponse from '../../../models/topic/response/TopicInfoResponse';
import { listTopicsByLesson } from '../../../services/topicService';
import { addQuizService } from '../../../services/quizService';

const initialValues: AddQuizRequest = {
    topicId: '',
    easyQuestionCount: 0,
    hardQuestionCount: 0,
    midQuestionCount: 0,
    latitude: 1,
    longitude: 1,
    name: '',
    time: 10,
};

const AddQuiz = () => {
    const [state, setState] = useState({
        loading: false,
        topics: [] as Array<TopicInfoResponse>,
    });

    const params = useParams();

    useEffect(() => {
        const getTopics = async () => {
            setState((prev) => ({ ...prev, loading: true }));

            try {
                const response = await listTopicsByLesson(params.lessonId || '');
                setState((prev) => ({ ...prev, topics: response.data.data || [] }));
            } catch (err) {
                errorMessage('Soru Eklenemedi!');
            }

            setState((prev) => ({ ...prev, loading: false }));
        };

        getTopics();

        // eslint-disable-next-line
    }, []);

    const handleFormSubmit = async (values: AddQuizRequest, actions: any) => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            await addQuizService(values);
            successMessage('Quiz Eklendi!');
            actions.resetForm({ values: initialValues });
        } catch (err) {
            errorMessage('Quiz Eklenemedi! (Soru sayısı mevcuttan büyük olamaz)');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <TeacherPageContainer title='QUIZ OLUŞTUR' subtitle='İlgili konu ile ilgili quiz oluştur.'>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                // validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                    <Form>
                        <Box
                            display='grid'
                            gap='30px'
                            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                            sx={{
                                '& > div': 'span 4',
                            }}
                            alignItems='center'
                        >
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <TextField
                                    name='name'
                                    value={values.name}
                                    onChange={handleChange}
                                    autoFocus
                                    margin='dense'
                                    label='Quiz Adı'
                                    fullWidth
                                    required
                                />
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <InputLabel id='time-label'>Süre (saniye)</InputLabel>
                                <Select
                                    name='time'
                                    labelId='time-label'
                                    value={values.time}
                                    label='Süre (saniye)'
                                    color='secondary'
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.time && !!errors.time}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={25}>25</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <InputLabel id='difficulty-label'>Konu</InputLabel>
                                <Select
                                    name='topicId'
                                    labelId='difficulty-label'
                                    value={values.topicId}
                                    label='Konu'
                                    color='secondary'
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.topicId && !!errors.topicId}
                                    required
                                >
                                    {state.topics.map((topic) => (
                                        <MenuItem key={topic.id} value={topic.id}>
                                            {topic.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <TextField
                                    name='easyQuestionCount'
                                    value={values.easyQuestionCount}
                                    onChange={handleChange}
                                    autoFocus
                                    margin='dense'
                                    label='Kolay Soru Sayısı'
                                    fullWidth
                                    type='number'
                                />
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <TextField
                                    name='midQuestionCount'
                                    value={values.midQuestionCount}
                                    onChange={handleChange}
                                    autoFocus
                                    margin='dense'
                                    label='Orta Soru Sayısı'
                                    fullWidth
                                    type='number'
                                />
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 2' }}>
                                <TextField
                                    name='hardQuestionCount'
                                    value={values.hardQuestionCount}
                                    onChange={handleChange}
                                    autoFocus
                                    margin='dense'
                                    label='Zor Soru Sayısı'
                                    fullWidth
                                    type='number'
                                />
                            </FormControl>
                        </Box>
                        <Box display='flex' justifyContent='end' mt='20px'>
                            <Button
                                type='submit'
                                color='secondary'
                                size='large'
                                variant='contained'
                            >
                                Başlat
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            {state.loading && <CustomBackdrop />}
        </TeacherPageContainer>
    );
};

export default AddQuiz;
