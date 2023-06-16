import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StudentPageContainer from '../../../containers/StudentPageContainer';
import QuizCard from './QuizCard';
import { useEffect, useState } from 'react';
import ActiveQuizResponse from '../../../models/quiz/response/ActiveQuizResponse';
import { listActiveQuizsService } from '../../../services/quizService';
import { errorMessage } from '../../../core/toastify';
import CustomBackdrop from '../../../components/CustomBackdrop';

const ActiveQuizs = () => {
    const [state, setState] = useState({
        loading: false,
        quizs: [] as Array<ActiveQuizResponse>,
    });

    useEffect(() => {
        getQuizs();
    }, []);

    const getQuizs = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listActiveQuizsService();
            setState((prev) => ({ ...prev, quizs: response.data.data || [] }));
            console.log(response.data.data)
        } catch (err) {
            errorMessage('Quizler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <StudentPageContainer>
            {state.quizs.length === 0 ? (
                <Typography variant='h3' textAlign='center'>
                    Aktif bir quiz bulunmamaktadır.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {state.quizs.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </Grid>
            )}
            {state.loading && <CustomBackdrop />}
        </StudentPageContainer>
    );
};

export default ActiveQuizs;
