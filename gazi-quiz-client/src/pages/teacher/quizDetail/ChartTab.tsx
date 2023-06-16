import { Box, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { colors } from '../../../contexts/CustomThemeContext';
import QuizDetailResponse from '../../../models/quiz/response/QuizDetailResponse';

interface Props {
    quizDetails: QuizDetailResponse
}

const ChartTab = ({quizDetails}: Props) => {
    const theme = useTheme();

    const containerBg =
        theme.palette.mode === 'dark' ? colors.primary[400] : colors.custom.adminLightBg;

    const studentValue = (100 / quizDetails.totalStudentCount) * quizDetails.entryStudentCount;
    const wrongValue = (100 / (quizDetails.wrongCount + quizDetails.correctCount)) * quizDetails.wrongCount;
    const correctValue = (100 / (quizDetails.wrongCount + quizDetails.correctCount)) * quizDetails.correctCount;
    
    const studentSeries: ApexOptions['series'] = [studentValue];
    const wrongSeries: ApexOptions['series'] = [wrongValue];
    const correctSeries: ApexOptions['series'] = [correctValue];

    const [studentOptions, setStudentOptions] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                },
            },
        },
        labels: ['Katılım Oranı'],
        theme: {
            mode: theme.palette.mode,
        },
        colors: ['#26A0FC']
    });

    const [wrongOptions, setWrongOptions] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                },
            },
        },
        labels: ['Yanlış Yapılan Sorular'],
        theme: {
            mode: theme.palette.mode,
        },
        colors: ['#DD465A']
    });

    const [correctOptions, setCorrectOptions] = useState<ApexOptions>({
        chart: {
            height: 350,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                },
            },
        },
        labels: ['Doğru Yapılan Sorular'],
        theme: {
            mode: theme.palette.mode,
        },
        colors: ['#36DEB7']
    });

    useEffect(() => {
        setStudentOptions((prev) => ({
            ...prev,
            chart: {
                ...studentOptions.chart,
                background:
                    theme.palette.mode === 'dark'
                        ? colors.primary[400]
                        : colors.custom.adminLightBg,
            },
            theme: { ...studentOptions.theme, mode: theme.palette.mode },
        }));

        setWrongOptions((prev) => ({
            ...prev,
            chart: {
                ...wrongOptions.chart,
                background:
                    theme.palette.mode === 'dark'
                        ? colors.primary[400]
                        : colors.custom.adminLightBg,
            },
            theme: { ...wrongOptions.theme, mode: theme.palette.mode },
        }));

        setCorrectOptions((prev) => ({
            ...prev,
            chart: {
                ...correctOptions.chart,
                background:
                    theme.palette.mode === 'dark'
                        ? colors.primary[400]
                        : colors.custom.adminLightBg,
            },
            theme: { ...correctOptions.theme, mode: theme.palette.mode },
        }));

        // eslint-disable-next-line
    }, [theme.palette.mode]);

    return (
        <Box
            display='grid'
            gridTemplateColumns='repeat(12, 1fr)'
            gridAutoRows='140px'
            gap='20px'
            marginTop={2}
        >
            <Box gridColumn='span 4' gridRow='span 2' paddingY={2} bgcolor={containerBg}>
                <div>
                    <ReactApexChart
                        options={studentOptions}
                        series={studentSeries}
                        type='radialBar'
                        height={350}
                    />
                </div>
            </Box>
            <Box gridColumn='span 4' gridRow='span 2' paddingY={2} bgcolor={containerBg}>
                <div>
                    <ReactApexChart
                        options={wrongOptions}
                        series={wrongSeries}
                        type='radialBar'
                        height={350}
                    />
                </div>
            </Box>
            <Box gridColumn='span 4' gridRow='span 2' paddingY={2} bgcolor={containerBg}>
                <div>
                    <ReactApexChart
                        options={correctOptions}
                        series={correctSeries}
                        type='radialBar'
                        height={350}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default ChartTab;
