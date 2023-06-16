import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import TeacherTableContainer from '../../../containers/TeacherTableContainer';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import paths from '../../../utils/constants/paths';
import QuizTableInfoResponse from '../../../models/quiz/response/QuizTableInfoResponse';
import CustomBackdrop from '../../../components/CustomBackdrop';
import { listQuizsByTeacher } from '../../../services/quizService';
import { errorMessage } from '../../../core/toastify';

const columns: Array<GridColDef> = [
    { field: 'name', headerName: 'Quiz Adı', flex: 1, cellClassName: 'name-column--cell' },
    {
        field: 'lessonName',
        headerName: 'Ders Adı',
        flex: 1,
        cellClassName: 'name-column--cell',
    },
    {
        field: 'date',
        headerName: 'Tarih',
        flex: 1,
        renderCell: (params) => params.value.toString().split("T")[0],
    },
    {
        field: 'studentCount',
        headerName: 'Öğrenci Sayısı',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params) => [
            <Link to={`${paths.teacher.base}${paths.teacher.quizDetail}/${params.id}`}>
                <Button
                    variant='contained'
                    size='small'
                    sx={{ borderRadius: '20px' }}
                    color='warning'
                >
                    Detaylar
                </Button>
            </Link>,
        ],
    },
];

const QuizList = () => {
    const [state, setState] = useState({
        loading: false,
        quizs: [] as Array<QuizTableInfoResponse>,
    });

    useEffect(() => {
        getQuizs();

        // eslint-disable-next-line
    }, []);

    const getQuizs = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listQuizsByTeacher();
            setState((prev) => ({ ...prev, quizs: response.data.data || [] }));
        } catch (err) {
            errorMessage('Quizler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <TeacherPageContainer title='QUIZLER' subtitle='Yapmış olduğunuz tüm quizler listelenmiştir.'>
            <TeacherTableContainer>
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
                    rows={state.quizs}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                />
            </TeacherTableContainer>
            {state.loading && <CustomBackdrop />}
        </TeacherPageContainer>
    );
};

export default QuizList;
