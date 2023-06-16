import Grid from '@mui/material/Grid';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Divider } from '@mui/material';
import { useState } from 'react';
import AddTopicModal from './AddTopicModal';
import { useNavigate } from 'react-router-dom';
import paths from '../../../utils/constants/paths';
import LessonInfoResponse from '../../../models/lesson/response/LessonInfoResponse';

interface LessonCardProps {
    lesson: LessonInfoResponse;
}

const LessonCard = (props: LessonCardProps) => {
    const { lesson } = props;

    const navigate = useNavigate();

    const navigateStudentList = () =>
        navigate(`${paths.teacher.base}${paths.teacher.studentList}/${lesson.id}`);

    const navigateAddStudent = () =>
        navigate(`${paths.teacher.base}${paths.teacher.addStudent}/${lesson.id}`);

    const navigateAddQuiz = () =>
        navigate(`${paths.teacher.base}${paths.teacher.addQuiz}/${lesson.id}`);

    // 1 - Add Topic Modal
    const [openTopicModal, setOpenTopicModal] = useState(false);
    const handleOpenTopicModal = () => setOpenTopicModal(true);
    const handleCloseTopicModal = () => setOpenTopicModal(false);
    // 1 ---

    return (
        <Grid item sm={12} md={6} lg={4}>
            <Card>
                <CardContent>
                    <Typography variant='h2' component='div' textAlign='center'>
                        {lesson.name}
                    </Typography>
                    <Box
                        display='flex'
                        gap={2}
                        flexWrap='wrap'
                        justifyContent='space-between'
                        marginTop={2}
                    >
                        <Button
                            onClick={handleOpenTopicModal}
                            variant='contained'
                            size='large'
                            sx={{ width: '45%' }}
                        >
                            Konu Ekle
                        </Button>
                        <Button
                            onClick={navigateStudentList}
                            variant='contained'
                            size='large'
                            sx={{ width: '45%' }}
                        >
                            Öğrenciler
                        </Button>
                        <Button
                            onClick={navigateAddStudent}
                            variant='contained'
                            size='large'
                            sx={{ width: '45%' }}
                        >
                            Öğrenci Ekle
                        </Button>
                        <Button
                            variant='contained'
                            size='large'
                            sx={{ width: '45%' }}
                            color='secondary'
                            onClick={navigateAddQuiz}
                        >
                            Quiz Başlat
                        </Button>
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <PeopleOutlinedIcon />
                    <span style={{ marginLeft: '8px' }}>{lesson.studentCount}</span>
                    <Divider orientation='vertical' flexItem sx={{ marginX: 2 }} />
                    <ArticleOutlinedIcon style={{ marginLeft: '0px' }} />
                    <span>{lesson.topicCount}</span>
                </CardActions>
            </Card>

            <AddTopicModal
                open={openTopicModal}
                handleClose={handleCloseTopicModal}
                lessonId={lesson.id}
            />
        </Grid>
    );
};

export default LessonCard;
