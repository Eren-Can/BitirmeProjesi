import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import TeacherTableContainer from '../../../containers/TeacherTableContainer';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import QuizDetailResponse from '../../../models/quiz/response/QuizDetailResponse';
import QuizStudentDetail from '../../../models/student/QuizStudentDetail';

interface Props {
    quizDetails: QuizDetailResponse;
}

const StudentDetailTab = ({ quizDetails }: Props) => {
    const [state, setState] = useState({
        students: [] as Array<QuizStudentDetail>,
    });

    const columns: Array<GridColDef> = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'fullName', headerName: 'Ad Soyad', flex: 1, cellClassName: 'name-column--cell' },
        {
            field: 'correctAnswer',
            headerName: 'Doğru Sayısı',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'wrongAnswer',
            headerName: 'Yanlış Sayısı',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
        {
            field: 'note',
            headerName: 'Not',
            type: 'number',
            headerAlign: 'left',
            align: 'left',
        },
    ];

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            students: quizDetails.studentsDetail.map((student) => ({
                id: student.id,
                correctAnswer: student.correctCount,
                fullName: student.fullName,
                wrongAnswer: student.wrongCount,
                note: (100 / (student.wrongCount + student.correctCount)) * student.correctCount,
            })),
        }));

        // eslint-disable-next-line
    }, []);

    return (
        <Box marginTop={2}>
            <TeacherTableContainer height='60vh'>
                <DataGrid
                    localeText={{
                        toolbarDensity: 'Boyut',
                        toolbarDensityLabel: 'Boyut',
                        toolbarFilters: 'Filtreler',
                        toolbarFiltersLabel: 'Filtreler',
                        toolbarColumns: 'Sütunlar',
                        toolbarColumnsLabel: 'Sütunlar',
                    }}
                    components={{ Toolbar: GridToolbar }}
                    rows={state.students}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                />
            </TeacherTableContainer>
        </Box>
    );
};

export default StudentDetailTab;
