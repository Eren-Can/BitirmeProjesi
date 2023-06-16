import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import TeacherTableContainer from '../../../containers/TeacherTableContainer';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import StudentInfoResponse from '../../../models/student/response/StudentInfoResponse';
import { listStudentsByRegisterLesson } from '../../../services/studentService';
import { useParams } from 'react-router-dom';
import { errorMessage } from '../../../core/toastify';
import CustomBackdrop from '../../../components/CustomBackdrop';

const columns: Array<GridColDef> = [
    { field: 'fullName', headerName: 'Ad Soyad', flex: 1, cellClassName: 'name-column--cell' },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        cellClassName: 'name-column--cell',
    },
    {
        field: 'schoolNumber',
        headerName: 'Okul No',
        flex: 1,
        cellClassName: 'name-column--cell',
    },
    {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params) => [
            <Button
                variant='contained'
                size='small'
                sx={{ borderRadius: '20px' }}
                color='error'
                onClick={() => console.log(params.id)}
            >
                Kaldır
            </Button>
        ],
    },
];

const StudentList = () => {
    const [state, setState] = useState({
        loading: false,
        students: [] as Array<StudentInfoResponse>,
    });

    const params = useParams();

    useEffect(() => {
        getStudents();

        // eslint-disable-next-line
    }, []);

    const getStudents = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listStudentsByRegisterLesson(params.lessonId || "");
            setState((prev) => ({ ...prev, students: response.data.data || [] }));
        } catch (err) {
            errorMessage('Öğrenciler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <TeacherPageContainer title='ÖĞRENCİLER' subtitle='Derse kayıtlı olan öğrenciler listelenmiştir.'>
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
                    rows={state.students}
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

export default StudentList;
