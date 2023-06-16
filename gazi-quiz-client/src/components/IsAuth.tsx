import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContextType, useAuth } from '../contexts/AuthContext';
import roles from '../utils/constants/roles';
import paths from '../utils/constants/paths';

const IsAuth = () => {
    const { auth } = useAuth() as AuthContextType;

    const location = useLocation();

    return !auth.isAuth ? (
        <Outlet />
    ) : auth.role.toLowerCase() === roles.teacher ? (
        <Navigate to={paths.teacher.base} state={{ from: location }} replace />
    ) : (
        <Navigate to={paths.student.base} state={{ from: location }} replace />
    );
};

export default IsAuth;
