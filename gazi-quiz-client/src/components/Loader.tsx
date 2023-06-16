import { colors } from '../contexts/CustomThemeContext';
import '../styles/loader.css';
import {Box} from '@mui/material';

const Loader = () => {
    return (
        <Box display='flex' width='100%' justifyContent='center' alignItems='center' height='100%'>
            <div className='lds-default'>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
                <div style={{ background: colors.greenAccent[500] }}></div>
            </div>
        </Box>
    );
};

export default Loader;
