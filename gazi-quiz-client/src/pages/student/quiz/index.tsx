import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TimerIcon from '@mui/icons-material/Timer';
import { useTheme } from '@mui/material';
import { colors } from '../../../contexts/CustomThemeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionInfo } from '../../../models/quiz/response/InfoQuizResponse';
import { addStudentToQuizService } from '../../../services/quizService';
import { errorMessage, successMessage } from '../../../core/toastify';
import AddResultRequest, { AddAnswer } from '../../../models/result/request/AddResultRequest';
import CustomBackdrop from '../../../components/CustomBackdrop';
import paths from '../../../utils/constants/paths';
import { addResultService } from '../../../services/resultService';

let questionCount = 0;
const answers = [] as Array<AddAnswer>;
let interval: NodeJS.Timer;
let totalTime = 0;

const Quiz = () => {
    const [state, setState] = useState({
        time: 99,
        questions: [] as Array<QuestionInfo>,
        loading: true,
        currentQuestion: 1,
        currentAnswer: 'E',
    });

    const params = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        getQuizInfo();

        interval = setInterval(() => {
            setState((prev) => ({ ...prev, time: prev.time - 1 }));
            totalTime++;
        }, 1000);

        return () => {
            clearInterval(interval);
            window.history.replaceState({}, document.title);
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (state.time === 0){
            handleAnswer()
        }
        // eslint-disable-next-line
    }, [state.time])

    const getQuizInfo = async () => {
        try {
            const response = await addStudentToQuizService({
                latitude: 1,
                longitude: 1,
                quizId: params.quizId || '',
            });
            setState((prev) => ({
                ...prev,
                questions: response.data.data?.questions || [],
                time: response.data.data?.questions[0].time || 0,
            }));

            console.log(response.data.data);
            questionCount = response.data.data?.questions.length || 0;
        } catch (err) {
            errorMessage('Quize katılırken bir hata oluştu!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    const handleAnswer = async () => {
        answers.push({
            questionId: state.questions[state.currentQuestion - 1].questionId,
            reply: state.currentAnswer,
            time: state.questions[state.currentQuestion - 1].time - state.time,
        });
        if (questionCount !== state.currentQuestion) {
            setState((prev) => ({
                ...prev,
                time: prev.questions[prev.currentQuestion].time,
                currentQuestion: prev.currentQuestion + 1,
                currentAnswer: 'E',
            }));
        } else {
            setState((prev) => ({ ...prev, loading: true }));
            clearInterval(interval);
            const result: AddResultRequest = {
                answers,
                quizId: params.quizId || '',
                totalTime,
            };

            try {
                await addResultService(result);
                successMessage('Quiz başarıyla tamamlandı.');
            } catch (error) {
                errorMessage('Server Error - Quiz tamamlanamadı');
            }
            navigate(`${paths.student.base}`, { replace: true });
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    if (state.loading) {
        return <CustomBackdrop />;
    }

    return (
        <Box display='flex' minHeight='100vh' sx={{ padding: { xs: 0, sm: 2 } }}>
            <Container
                maxWidth='sm'
                sx={{
                    boxShadow: 2,
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? colors.primary[400]
                            : colors.custom.adminLightBg,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingY: 4,
                    gap: 3,
                }}
            >
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    <Box display='flex' alignItems='center' gap={1}>
                        <TimerIcon fontSize='large' />
                        <Typography variant='h4' component='span'>
                            {state.time}
                        </Typography>
                    </Box>
                    <Typography variant='h2' component='span'>
                        {state.currentQuestion}.Soru
                    </Typography>
                    <Button onClick={handleAnswer} variant='contained' color='secondary'>
                        {state.currentQuestion === questionCount ? 'Sınavı Bitir' : 'Sonraki Soru'}
                    </Button>
                </Box>
                <div
                    dangerouslySetInnerHTML={{
                        __html: state.questions[state.currentQuestion - 1].content ?? "",
                    }}
                    style={{ padding: '0 8px', width: '100%' }}
                />
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='space-around'
                    width='100%'
                >
                    <Box display='flex' justifyContent='space-around' width='100%'>
                        <Button
                            onClick={() => setState((c) => ({ ...c, currentAnswer: 'A' }))}
                            variant={state.currentAnswer === 'A' ? 'contained': 'outlined'}
                            color='secondary'
                        >
                            <Typography variant='h4' component='span'>
                                A
                            </Typography>
                        </Button>
                        <Button
                            onClick={() => setState((c) => ({ ...c, currentAnswer: 'B' }))}
                            variant={state.currentAnswer === 'B' ? 'contained': 'outlined'}
                            color='secondary'
                        >
                            <Typography variant='h4' component='span'>
                                B
                            </Typography>
                        </Button>
                        <Button
                            onClick={() => setState((c) => ({ ...c, currentAnswer: 'C' }))}
                            variant={state.currentAnswer === 'C' ? 'contained': 'outlined'}
                            color='secondary'
                        >
                            <Typography variant='h4' component='span'>
                                C
                            </Typography>
                        </Button>
                        <Button
                            onClick={() => setState((c) => ({ ...c, currentAnswer: 'D' }))}
                            variant={state.currentAnswer === 'D' ? 'contained': 'outlined'}
                            color='secondary'
                        >
                            <Typography variant='h4' component='span'>
                                D
                            </Typography>
                        </Button>
                    </Box>
                    <Typography
                        variant='h4'
                        component='span'
                        textAlign='center'
                        marginTop={4}
                        sx={{ fontStyle: 'italic', color: 'primary.main' }}
                    >
                        GAZI QUIZ
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Quiz;
