import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Form, Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import TextEditor from './TextEditor';
import { useParams } from 'react-router-dom';
import AddQuestionRequest from '../../../models/question/request/AddQuestionRequest';
import { errorMessage, successMessage } from '../../../core/toastify';
import { useState } from 'react';
import CustomBackdrop from '../../../components/CustomBackdrop';
import { addQuestionService } from '../../../services/questionService';

const initialValues: AddQuestionRequest = {
    topicId: '',
    answer: 'A',
    content: '',
    difficulty: 1,
    time: 30,
};

const AddQuestion = () => {
    const [state, setState] = useState({
        loading: false,
    });

    const isNonMobile = useMediaQuery('(min-width:600px)');

    const params= useParams();

    const handleFormSubmit = async (values: AddQuestionRequest, actions: any) => {
        values.topicId = params.topicId || '';

        if(values.content.length < 50){
            errorMessage('Soru içeriği en az 50 karakter olmalıdır.');
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));

        try {
            await addQuestionService(values);
            successMessage('Soru Eklendi!');
        } catch (err) {
            errorMessage('Soru Eklenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));

        actions.resetForm({ values: initialValues });
    };

    return (
        <TeacherPageContainer title='SORU OLUŞTUR' subtitle='İlgili konu ile ilgili soru oluştur.'>
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
                            gridTemplateColumns='repeat(3, minmax(0, 1fr))'
                            sx={{
                                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                            }}
                        >
                            <FormControl sx={{ gridColumn: 'span 1' }}>
                                <InputLabel id='answer-label'>Cevap</InputLabel>
                                <Select
                                    name='answer'
                                    labelId='answer-label'
                                    value={values.answer}
                                    label='Cevap'
                                    color='secondary'
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.answer && !!errors.answer}
                                >
                                    <MenuItem value='A'>A</MenuItem>
                                    <MenuItem value='B'>B</MenuItem>
                                    <MenuItem value='C'>C</MenuItem>
                                    <MenuItem value='D'>D</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 1' }}>
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
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={40}>40</MenuItem>
                                    <MenuItem value={50}>50</MenuItem>
                                    <MenuItem value={60}>60</MenuItem>
                                    <MenuItem value={75}>75</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                    <MenuItem value={105}>105</MenuItem>
                                    <MenuItem value={120}>120</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ gridColumn: 'span 1' }}>
                                <InputLabel id='difficulty-label'>Zorluk</InputLabel>
                                <Select
                                    name='difficulty'
                                    labelId='difficulty-label'
                                    value={values.difficulty}
                                    label='Zorluk'
                                    color='secondary'
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched.difficulty && !!errors.difficulty}
                                >
                                    <MenuItem value={1}>Kolay</MenuItem>
                                    <MenuItem value={2}>Orta</MenuItem>
                                    <MenuItem value={3}>Zor</MenuItem>
                                </Select>
                            </FormControl>
                            <Box sx={{ gridColumn: 'span 3' }}>
                                <TextEditor values={values} />
                            </Box>
                        </Box>
                        <Box display='flex' justifyContent='end' mt='20px'>
                            <Button type='submit' color='secondary' variant='contained'>
                                Oluştur
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            {state.loading && <CustomBackdrop />}
        </TeacherPageContainer>
    );
};

export default AddQuestion;
