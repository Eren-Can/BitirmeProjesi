import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                paddingTop: '1rem',
                paddingBottom: '1rem',
            }}
        >
            <Container maxWidth='lg'>
                <Grid container direction='column' alignItems='center'>
                    <Grid item xs={12}>
                        <IconButton>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton>
                            <EmailIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color='textSecondary' variant='subtitle1'>
                            {`${new Date().getFullYear()} | GAZI QUIZ`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
