import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface RedirectProps {
    to: string;
}

const Redirect = ({to}: RedirectProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    })

    return <Loader />;
};

export default Redirect;
