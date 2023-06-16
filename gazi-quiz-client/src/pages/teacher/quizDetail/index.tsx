import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import ChartTab from './ChartTab';
import StudentDetailTab from './StudentDetailTab';
import { useParams } from 'react-router-dom';
import QuizDetailResponse from '../../../models/quiz/response/QuizDetailResponse';
import { errorMessage } from '../../../core/toastify';
import { quizDetailService } from '../../../services/quizService';
import CustomBackdrop from '../../../components/CustomBackdrop';

const QuizDetail = () => {
    const params = useParams();

    const [tabValue, setTabValue] = useState(0);

    const [state, setState] = useState({
        loading: true,
        quizDetails: null as QuizDetailResponse | null,
    });

    useEffect(() => {
        const getQuizDetail = async () => {
            try {
                const response = await quizDetailService(params.quizId || '');
                setState((prev) => ({ ...prev, quizDetails: response.data.data || null }));
            } catch (err) {
                errorMessage('Quiz Detayları Listelenemedi!');
                console.log(err);
            }

            setState((prev) => ({ ...prev, loading: false }));
        };

        getQuizDetail();

        // eslint-disable-next-line
    }, []);

    console.log('quizdetail', state.quizDetails);

    return (
        <TeacherPageContainer
            title='QUIZ DETAYLARI'
            subtitle='İlgili quiz ile alakalı detaylı bilgilere erişebilirsiniz'
        >
            {state.quizDetails && state.quizDetails.studentsDetail.length > 0 ? (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue}>
                            <Tab label='Grafikler' onClick={() => setTabValue(0)} />
                            <Tab label='Öğrenci Detayları' onClick={() => setTabValue(1)} />
                        </Tabs>
                    </Box>

                    {tabValue === 0 ? (
                        <ChartTab quizDetails={state.quizDetails} />
                    ) : (
                        <StudentDetailTab quizDetails={state.quizDetails} />
                    )}
                </>
            ) : (
                <Box sx={{textAlign: "center", fontSize: 26}}>
                    Bu quize ait veri bulunmamaktadır.
                </Box>
            )}

            {state.loading && state.quizDetails === null && <CustomBackdrop />}
        </TeacherPageContainer>
    );
};

export default QuizDetail;
