import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { colors } from '../contexts/CustomThemeContext';
import useChangeColor from '../utils/hooks/useChangeColor';

interface TeacherTableContainerProps {
    height?: string;
    children: any;
}

const TeacherTableContainer = ({ height = '70vh', children }: TeacherTableContainerProps) => {
    const theme = useTheme();

    const changeColor = useChangeColor();

    return (
        <Box
            height={height}
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none',
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none',
                },
                '& .name-column--cell': {
                    color: changeColor(colors.greenAccent, 300),
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: changeColor(colors.blueAccent, 700),
                    borderBottom: 'none',
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor:
                        theme.palette.mode === 'dark'
                            ? colors.primary[400]
                            : colors.custom.adminLightBg,
                },
                '& .MuiDataGrid-footerContainer': {
                    borderTop: 'none',
                    backgroundColor: changeColor(colors.blueAccent, 700),
                },
                '& .MuiCheckbox-root': {
                    color: `${changeColor(colors.greenAccent, 200)} !important`,
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${changeColor(colors.grey, 100)} !important`,
                },
            }}
        >
            {children}
        </Box>
    );
};

export default TeacherTableContainer;
