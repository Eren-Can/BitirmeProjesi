import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100%'
            flexDirection='column'
        >
            <Typography variant='h1' fontSize='150px' component='div' textAlign='center'>
                403
            </Typography>
            <Typography
                variant='h1'
                fontSize='50px'
                color='secondary.main'
                component='div'
                textAlign='center'
            >
                Bu Sayfaya Erişme Yetkiniz Yok!
            </Typography>
        </Box>
    );
};

export default Unauthorized;
