import { Box, useTheme } from '@mui/material';
import { colors } from '../../../contexts/CustomThemeContext';
import TeacherPageContainer from '../../../containers/TeacherPageContainer';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import TopicIcon from '@mui/icons-material/Topic';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import StatusCard from './StatusCard';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { errorMessage } from '../../../core/toastify';
import { dashboardInfoService } from '../../../services/teacherService';

const Dashboard = () => {
    const theme = useTheme();

    const [state, setState] = useState({
        loading: true,
        lessonCount: 0,
        questionCount: 0,
        topicCount: 0,
        quizCount: 0,
        series: [
            {
                name: 'Konu Sayısı',
                data: [4, 6, 2, 7, 5, 1],
                color: '#26A0FC',
            },
            {
                name: 'Soru Sayısı',
                data: [17, 27, 8, 32, 21, 3],
                color: '#FF6178',
            },
            {
                name: 'Quiz Sayısı',
                data: [7, 2, 5, 4, 2, 0],
                color: '#FEBC3B',
            },
        ] as ApexOptions['series'],
        options: {
            chart: {
                type: 'bar',
                height: 396,
                background:
                    theme.palette.mode === 'dark'
                        ? colors.primary[400]
                        : colors.custom.adminLightBg,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    // columnWidth: '55%',
                    // endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Ders 1', 'Ders 2', 'Ders 3', 'Ders 4', 'Ders 5', 'Drs 6'],
            },
            yaxis: {
                title: {
                    // text: '$ (thousands)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    // formatter: function (val: any) {
                    //     return '$ ' + val + ' thousands';
                    // },
                },
            },
            theme: {
                mode: theme.palette.mode,
            },
        } as ApexOptions,
    });

    const containerBg =
        theme.palette.mode === 'dark' ? colors.primary[400] : colors.custom.adminLightBg;

    useEffect(() => {
        const getDashboardInfo = async () => {
            try {
                const response = await dashboardInfoService();
                setState(prev => ({
                    ...prev,
                    lessonCount: response.data.data?.lessonCount || 0,
                    topicCount: response.data.data?.topicCount || 0,
                    questionCount: response.data.data?.questionCount || 0,
                    quizCount: response.data.data?.quizCount || 0,
                    options: {
                        ...state.options,
                        xaxis: {
                            ...state.options.xaxis,
                            categories: response.data.data?.lessonDetails.map(x => x.lessonName),
                        }
                    },
                    series: [
                        {
                            name: 'Konu Sayısı',
                            data: response.data.data?.lessonDetails.map(x => x.topicCount) || [],
                            color: '#26A0FC',
                        },
                        {
                            name: 'Soru Sayısı',
                            data: response.data.data?.lessonDetails.map(x => x.questionCount) || [],
                            color: '#FF6178',
                        },
                        {
                            name: 'Quiz Sayısı',
                            data: response.data.data?.lessonDetails.map(x => x.quizCount) || [],
                            color: '#FEBC3B',
                        },
                    ]
                }))
            } catch (err) {
                errorMessage('Bilgiler Listelenemedi!');
            }

            setState((prev) => ({ ...prev, loading: false }));
        };

        getDashboardInfo();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                chart: {
                    ...prev.options.chart,
                    background:
                        theme.palette.mode === 'dark'
                            ? colors.primary[400]
                            : colors.custom.adminLightBg,
                },
                theme: { ...prev.options.theme, mode: theme.palette.mode },
            },
        }));

        // eslint-disable-next-line
    }, [theme.palette.mode]);

    return (
        <TeacherPageContainer title='ANASAYFA' subtitle='Gazi Quiz sistemine hoşgeldiniz'>
            <Box
                display='grid'
                gridTemplateColumns='repeat(12, 1fr)'
                gridAutoRows='140px'
                gap='20px'
            >
                <StatusCard
                    title='DERS SAYISI'
                    count={state.lessonCount}
                    icon={<PlayLessonIcon fontSize='large' color='secondary' />}
                />
                <StatusCard
                    title='KONU SAYISI'
                    count={state.topicCount}
                    icon={<TopicIcon fontSize='large' color='secondary' />}
                />
                <StatusCard
                    title='SORU SAYISI'
                    count={state.questionCount}
                    icon={<QuestionMarkOutlinedIcon fontSize='large' color='secondary' />}
                />
                <StatusCard
                    title='QUIZ SAYISI'
                    count={state.quizCount}
                    icon={<QuizIcon fontSize='large' color='secondary' />}
                />

                <Box gridColumn='span 12' gridRow='span 3' paddingY={2} bgcolor={containerBg}>
                    <div id='chart'>
                        <ReactApexChart options={state.options} series={state.series} type='bar' height={396} />
                    </div>
                </Box>
            </Box>
        </TeacherPageContainer>
    );
};

export default Dashboard;
