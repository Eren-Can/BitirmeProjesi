import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthContextType, useAuth } from '../contexts/AuthContext';
import paths from '../utils/constants/paths';

interface PropsType {
    allowedRoles: Array<string>;
}

const RequiredAuth = ({ allowedRoles }: PropsType) => {
    const { auth } = useAuth() as AuthContextType;
    const location = useLocation();

    return allowedRoles.includes(auth.role) ? (
        <Outlet />
    ) : auth.isAuth ? (
        <Navigate to={paths.unauthorized} state={{ from: location }} replace />
    ) : (
        <Navigate to={paths.login} state={{ from: location }} replace />
    );
};

export default RequiredAuth;
