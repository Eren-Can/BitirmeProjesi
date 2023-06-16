import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colors } from '../../../contexts/CustomThemeContext';
import StudentPageContainer from '../../../containers/StudentPageContainer';

const data = [
    {
        question: 'Quize girmek için gereken nelerdir?',
        answer: 'Öğretmenin quiz açtıktan sonra belli bir zaman alanında girmek zorundasınız ve belli bir konumda olmanız durumunda quize girebilirsiniz.',
    },
    {
        question: 'Notlarımı nasıl öğrenebilirim?',
        answer: 'Sınav sonuçlarını ve istatistikleri dersin öğretmeni görebilir. Bu yüzden hocanıza sorabilirsiniz.',
    },
    {
        question: 'Derslere kayıt olmam için yapmam gereken bir şey var mı?',
        answer: 'Hayır, yok. Dersin sorumlu öğretmeni sisteme kayıtlı olan öğrencileri derslere ekleyecektir.',
    },
    {
        question: 'Başka bir cihazdan giriş yapabilir miyim?',
        answer: 'Evet. Fakat başka bir cihazdan giriş yapılması durumunda 24 saat boyunca açılabilecek quizlere girişiniz engellenecektir.',
    },
];

const FAQ = () => {
    return (
        <StudentPageContainer>
            {data.map((content, i) => (
                <Accordion defaultExpanded={false} key={i}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant='h5'>
                            {content.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{content.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </StudentPageContainer>
    );
};

export default FAQ;
