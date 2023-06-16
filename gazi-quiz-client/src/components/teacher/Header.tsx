import { Typography, Box } from '@mui/material';
import useChangeColor from '../../utils/hooks/useChangeColor';
import { colors } from '../../contexts/CustomThemeContext';

interface HeaderProps {
    title: string;
    subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
    const changeColor = useChangeColor();

    return (
        <Box mb='30px'>
            <Typography
                variant='h2'
                color={changeColor(colors.grey, 100)}
                fontWeight='bold'
                sx={{ m: '0 0 5px 0' }}
            >
                {title}
            </Typography>
            <Typography variant='h5' color={changeColor(colors.greenAccent, 400)}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;
