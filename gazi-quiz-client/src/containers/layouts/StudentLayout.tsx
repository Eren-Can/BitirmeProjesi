import { Outlet } from 'react-router-dom';
import {Box} from '@mui/material';
import StudentAppBar from '../../components/student/StudentAppBar';
import Footer from '../../components/student/Footer';

interface StudentLayoutProps {
    isQuiz: boolean;
}

const StudentLayout = ({ isQuiz }: StudentLayoutProps) => {
    return (
        <>
            {!isQuiz ? (
                <Box
                    display='flex'
                    justifyContent='space-between'
                    flexDirection='column'
                    minHeight='100vh'
                >
                    <Box>
                        <StudentAppBar />
                        <main>
                            <Outlet />
                        </main>
                    </Box>
                    <Footer />
                </Box>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default StudentLayout;
