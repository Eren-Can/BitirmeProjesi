import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { colors, useCustomTheme } from '../../contexts/CustomThemeContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import { useNavigate } from 'react-router-dom';
import paths from '../../utils/constants/paths';
import { deafultAuthType, useAuth } from '../../contexts/AuthContext';

const TopBar = () => {
    const theme = useTheme();

    const { toggleColorMode } = useCustomTheme();

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem(localStorageVariables.token);
        setAuth(deafultAuthType);
        navigate(paths.login);
    };

    return (
        <Box display='flex' justifyContent='space-between' p={2}>
            {/* SEARCH BAR */}
            <Box
                display='flex'
                bgcolor={
                    theme.palette.mode === 'dark' ? colors.primary[400] : colors.custom.adminLightBg
                }
                borderRadius='3px'
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Ara..' />
                <IconButton type='button' sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display='flex'>
                <IconButton onClick={toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <LogoutOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TopBar;
