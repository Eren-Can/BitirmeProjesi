import {Box} from '@mui/material';
import Header from '../components/teacher/Header';
import Button from '@mui/material/Button';
import { colors } from '../contexts/CustomThemeContext';
import useChangeColor from '../utils/hooks/useChangeColor';

interface TeacherPageContainerProps {
    title?: string;
    subtitle?: string;
    children: any;
    isButton?: boolean;
    onClick?: any;
    buttonText?: string;
    buttonIcon?: any;
}

const TeacherPageContainer = (props: TeacherPageContainerProps) => {
    const {
        title = 'Page Title',
        subtitle = 'Page Subtitle',
        children,
        isButton = false,
        onClick,
        buttonText = 'button text',
        buttonIcon,
    } = props;

    const changeColor = useChangeColor();

    return (
        <Box p='20px 20px 30px 20px'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Header title={title} subtitle={subtitle} />
                {isButton && (
                    <Box>
                        <Button
                            sx={{
                                backgroundColor: changeColor(colors.blueAccent, 700),
                                color: changeColor(colors.grey, 100),
                                fontSize: '14px',
                                fontWeight: 'bold',
                                padding: '10px 20px',
                            }}
                            onClick={onClick}
                        >
                            {buttonIcon}
                            {buttonText === '' ? null : (
                                <span style={{ marginLeft: buttonIcon ? '10px' : 0 }}>
                                    {buttonText}
                                </span>
                            )}
                        </Button>
                    </Box>
                )}
            </Box>

            {children}
        </Box>
    );
};

export default TeacherPageContainer;
