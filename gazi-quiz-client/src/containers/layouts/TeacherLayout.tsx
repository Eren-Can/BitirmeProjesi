import MenuBar from '../../components/teacher/MenuBar';
import TopBar from '../../components/teacher/TopBar';
import { Outlet } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';

import '../../styles/teacher.css';

const TeacherLayout = () => {
    return (
        <ProSidebarProvider>
            <div className='app'>
                <MenuBar />
                <main className='content'>
                    <TopBar />
                    <Outlet />
                </main>
            </div>
        </ProSidebarProvider>
    );
};

export default TeacherLayout;
