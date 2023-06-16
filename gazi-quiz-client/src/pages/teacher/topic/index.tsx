import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import TeacherTableContainer from '../../../containers/TeacherTableContainer';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import paths from '../../../utils/constants/paths';
import TopicInfoResponse from '../../../models/topic/response/TopicInfoResponse';
import { listTopicsByTeacher } from '../../../services/topicService';
import { errorMessage } from '../../../core/toastify';
import CustomBackdrop from '../../../components/CustomBackdrop';

const columns: Array<GridColDef> = [
    { field: 'name', headerName: 'Konu Adı', flex: 1, cellClassName: 'name-column--cell' },
    {
        field: 'lessonName',
        headerName: 'Ders Adı',
        flex: 1,
        cellClassName: 'name-column--cell',
    },
    {
        field: 'questionCount',
        headerName: 'Soru Sayısı',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'quizCount',
        headerName: 'Quiz Sayısı',
        type: 'number',
        headerAlign: 'left',
        align: 'left',
    },
    {
        field: 'actions',
        type: 'actions',
        width: 120,
        getActions: (params) => [
            <Link to={`${paths.teacher.base}${paths.teacher.addQuestion}/${params.id}`}>
                <Button
                    variant='contained'
                    size='small'
                    sx={{ borderRadius: '20px' }}
                    color='secondary'
                >
                    Soru Ekle
                </Button>
            </Link>,
        ],
    },
];

const Topic = () => {
    const [state, setState] = useState({
        loading: false,
        topics: [] as Array<TopicInfoResponse>,
    });

    useEffect(() => {
        getTopics();
    }, []);

    const getTopics = async () => {
        setState((prev) => ({ ...prev, loading: true }));

        try {
            const response = await listTopicsByTeacher();
            setState((prev) => ({ ...prev, topics: response.data.data || [] }));
        } catch (err) {
            errorMessage('Dersler Listelenemedi!');
        }

        setState((prev) => ({ ...prev, loading: false }));
    };

    return (
        <TeacherPageContainer title='KONULAR' subtitle='Size ait tüm konular listelenmiştir.'>
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
                    rows={state.topics}
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

export default Topic;
