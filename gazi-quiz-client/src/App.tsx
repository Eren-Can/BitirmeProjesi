import { BrowserRouter, Route, Routes } from 'react-router-dom';
import paths from './utils/constants/paths';
import StudentLayout from './containers/layouts/StudentLayout';
import TeacherLayout from './containers/layouts/TeacherLayout';
import ActiveQuizs from './pages/student/activeQuizs';
import Dashboard from './pages/teacher/dashboard';
import Lesson from './pages/teacher/lesson';
import Topic from './pages/teacher/topic';
import AddQuestion from './pages/teacher/addQuestion';
import AddStudent from './pages/teacher/addStudent';
import StudentList from './pages/teacher/studentList';
import QuizList from './pages/teacher/quizList';
import Quiz from './pages/student/quiz';
import FAQ from './pages/student/faq';
import Login from './pages/login';
import StudentRegister from './pages/studentRegister';
import TeacherRegister from './pages/teacherRegister';
import Redirect from './components/Redirect';
import QuizDetail from './pages/teacher/quizDetail';
import Unauthorized from './pages/[common]/Unauthorized';
import RequiredAuth from './components/RequiredAuth';
import roles from './utils/constants/roles';
import IsAuth from './components/IsAuth';
import AddQuiz from './pages/teacher/addQuiz';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={paths.student.all} element={<StudentRoutes />} />
                <Route path={paths.teacher.all} element={<TeacherRoutes />} />

                <Route element={<IsAuth />}>
                    <Route path={paths.login} element={<Login />} />
                    <Route path={paths.studentRegister} element={<StudentRegister />} />
                    <Route path={paths.teacherRegister} element={<TeacherRegister />} />
                </Route>

                <Route path={paths.unauthorized} element={<Unauthorized />} />
                <Route path='*' element={<Redirect to={paths.login} />} />
            </Routes>
        </BrowserRouter>
    );
};

const StudentRoutes = () => {
    return (
        <Routes>
            <Route element={<RequiredAuth allowedRoles={[roles.student]} />}>
                <Route element={<StudentLayout isQuiz={false} />}>
                    <Route index element={<ActiveQuizs />} />
                    <Route path={paths.student.activeQuizs} element={<ActiveQuizs />} />
                    <Route path={paths.student.faq} element={<FAQ />} />
                    <Route path='*' element={<Redirect to={paths.student.base} />} />
                </Route>
                <Route element={<StudentLayout isQuiz={true} />}>
                    <Route path={`${paths.student.quiz}/:quizId`} element={<Quiz />} />
                </Route>
            </Route>
        </Routes>
    );
};

const TeacherRoutes = () => {
    return (
        <Routes>
            <Route element={<RequiredAuth allowedRoles={[roles.teacher]} />}>
                <Route element={<TeacherLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path={paths.teacher.dashboard} element={<Dashboard />} />
                    <Route path={paths.teacher.lesson} element={<Lesson />} />
                    <Route path={paths.teacher.topic} element={<Topic />} />
                    <Route path={paths.teacher.quizList} element={<QuizList />} />
                    <Route
                        path={`${paths.teacher.studentList}/:lessonId`}
                        element={<StudentList />}
                    />
                    <Route
                        path={`${paths.teacher.addStudent}/:lessonId`}
                        element={<AddStudent />}
                    />
                    <Route
                        path={`${paths.teacher.addQuiz}/:lessonId`}
                        element={<AddQuiz />}
                    />
                    <Route
                        path={`${paths.teacher.addQuestion}/:topicId`}
                        element={<AddQuestion />}
                    />
                    <Route path={`${paths.teacher.quizDetail}/:quizId`} element={<QuizDetail />} />

                    <Route path='*' element={<Redirect to={paths.teacher.base} />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
