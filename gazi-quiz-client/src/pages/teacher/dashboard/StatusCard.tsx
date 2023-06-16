import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { colors } from '../../../contexts/CustomThemeContext';

interface StatusCardProps {
    title: string;
    count: number;
    icon: any;
}

const StatusCard = ({ title, count, icon }: StatusCardProps) => {
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const theme = useTheme();

    const containerBg =
        theme.palette.mode === 'dark' ? colors.primary[400] : colors.custom.adminLightBg;

    return (
        <Box
            sx={{
                gridColumn: isNonMobile ? 'span 3' : 'span 12',
            }}
            bgcolor={containerBg}
            display='flex'
            alignItems='center'
            justifyContent='space-evenly'
            flexDirection='column'
        >
            {icon}
            <Typography variant='h5'>{title}</Typography>
            <Typography variant='h1' color='secondary'>
                {count}
            </Typography>
        </Box>
    );
};

export default StatusCard;
