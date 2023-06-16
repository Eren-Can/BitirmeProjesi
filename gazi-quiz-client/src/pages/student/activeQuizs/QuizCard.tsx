import Grid from '@mui/material/Grid';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import paths from '../../../utils/constants/paths';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ActiveQuizResponse from '../../../models/quiz/response/ActiveQuizResponse';

interface QuizCardProps {
    quiz: ActiveQuizResponse;
}

const QuizCard = (props: QuizCardProps) => {
    const { quiz } = props;

    const navigate = useNavigate();

    const navigateQuiz = () =>
        navigate(`${paths.student.base}${paths.student.quiz}/${quiz.id}`);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardContent>
                    <Typography variant='h2' component='div' textAlign='center'>
                        {quiz.quizName}
                    </Typography>
                    <Box
                        display='flex'
                        marginTop={2}
                        gap={1}
                    >
                        <Typography variant='h5' component='span'>
                            Ders Adı : 
                        </Typography>
                        <Typography variant='h5' component='span'>
                            {quiz.lessonName}
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        marginTop={2}
                        gap={1}
                    >
                        <Typography variant='h5' component='span'>
                            Konu Adı : 
                        </Typography>
                        <Typography variant='h5' component='span'>
                            {quiz.topicName}
                        </Typography>
                    </Box>
                    <Box
                        display='flex'
                        marginTop={2}
                        gap={1}
                    >
                        <Typography variant='h5' component='span'>
                            Son Giriş Tarihi : 
                        </Typography>
                        <Typography variant='h5' component='span'>
                            {quiz.lastEntryDate.toString().split("T")[0]}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', marginBottom: 1 }}>
                    <Button variant='contained' color='success' sx={{color: "white"}} onClick={navigateQuiz}>
                        Quiz'e Gir <ArrowForwardIcon />
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default QuizCard;
