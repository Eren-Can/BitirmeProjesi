import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import TeacherTableContainer from '../../../containers/TeacherTableContainer';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import { Button, Box } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import * as XLSX from 'xlsx';
import { errorMessage, successMessage } from '../../../core/toastify';
import StudentInfoResponse from '../../../models/student/response/StudentInfoResponse';
import { useParams } from 'react-router-dom';
import { listStudentsByUnregisterLesson } from '../../../services/studentService';
import CustomBackdrop from '../../../components/CustomBackdrop';
import { addStudentToLessonService } from '../../../services/lessonService';

const columns: Array<GridColDef> = [
    {
        field: 'fullName',
        headerName: 'Ad Soyad',
        flex: 1,
        cellClassName: 'name-column--cell',
    },
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
    },
];

const AddStudent = () => {
    const [state, setState] = useState({
        loading: false,
        students: [] as Array<StudentInfoResponse>,
        selectedStudents: [] as Array<string>,
    });

    const params = useParams();

    useEffect(() => {
        getStudents();

        // eslint-disable-next-line
    }, []);

    const getStudents = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listStudentsByUnregisterLesson(params.lessonId || '');
            setState((prev) => ({ ...prev, students: response.data.data || [] }));
        } catch (err) {
            errorMessage('Öğrenciler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;

        if (selectedFile) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);

            reader.onload = (ee) => {
                const abc = ee.target?.result;
                const workbook = XLSX.read(abc, { type: 'buffer' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                console.log(data);
            };
        } else {
            errorMessage('Lütfen bir excel dosyası seçiniz.');
        }
    };

    const handleAddStudent = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            await addStudentToLessonService({
                lessonId: params.lessonId || "",
                studentIds: state.selectedStudents,
            });
            await getStudents();
            successMessage('Öğrenciler Eklendi!');
        } catch (err) {
            errorMessage('Öğrenciler Eklenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    }

    return (
        <TeacherPageContainer
            title='ÖĞRENCİ EKLE'
            subtitle='İlgili derse seçtiğiniz öğrencileri ekleyebilirsiniz.'
        >
            <Box display='flex' justifyContent='end' gap={2}>
                <Button variant='contained' component='label' size='small'>
                    <AddCircleOutlinedIcon sx={{ marginRight: 1 }} />
                    Excel İle Ekle
                    <input onChange={handleFile} type='file' hidden />
                </Button>
                <Button onClick={handleAddStudent} variant='contained' color='secondary' size='small'>
                    <AddCircleOutlinedIcon sx={{ marginRight: 1 }} />
                    Seçilenler Ekle
                </Button>
            </Box>
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
                    checkboxSelection
                    onRowSelectionModelChange={(newSelected) =>
                        setState((prev) => ({ ...prev, selectedStudents: newSelected.map(x => x.toString()) }))
                    }
                    rowSelectionModel={state.selectedStudents}
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

export default AddStudent;
