import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from 'react-router-dom';
import paths from '../../utils/constants/paths';
import { colors, useCustomTheme } from '../../contexts/CustomThemeContext';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import { deafultAuthType, useAuth } from '../../contexts/AuthContext';

const StudentAppBar = () => {
    const navigate = useNavigate();

    const { toggleColorMode } = useCustomTheme();

    const {setAuth} = useAuth();

    // 1 - Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    // 1 ---

    const handleTheme = () => {
        toggleColorMode();
        handleClose();
    };

    const handleLogout = () => {
        localStorage.removeItem(localStorageVariables.token);
        setAuth(deafultAuthType);
        navigate(paths.login);
        handleClose();
    };

    const navigateActiveQuiz = () => navigate(`${paths.student.base}${paths.student.activeQuizs}`);

    const navigateFAQ = () => navigate(`${paths.student.base}${paths.student.faq}`);

    return (
        <AppBar color='inherit' position='static'>
            <Container maxWidth='md'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box display='flex' flexDirection='row' gap={1} alignItems='center'>
                        <HelpOutlineIcon fontSize='large' color='secondary' />
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: colors.greenAccent[500],
                                textDecoration: 'none',
                            }}
                        >
                            GAZİ QUIZ
                        </Typography>
                    </Box>

                    <Box display='flex' gap={2}>
                        <Button
                            onClick={navigateActiveQuiz}
                            sx={{ display: 'block' }}
                            color='primary'
                            variant='outlined'
                        >
                            Quizler
                        </Button>
                        <Button
                            onClick={navigateFAQ}
                            sx={{ display: 'block' }}
                            color='primary'
                            variant='outlined'
                        >
                            SSS
                        </Button>
                        <IconButton color='primary' onClick={handleClick}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleTheme}>Tema Değiştir</MenuItem>
                            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default StudentAppBar;
