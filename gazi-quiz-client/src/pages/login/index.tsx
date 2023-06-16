import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import paths from '../../utils/constants/paths';
import { Formik, Form } from 'formik';
import LoginRequest from '../../models/auth/request/LoginRequest';
import validationSchema from '../../validations/loginValidator';
import { loginService } from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { errorMessage, successMessage } from '../../core/toastify';
import { encryptData } from '../../core/cryptoToken';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import CustomBackdrop from '../../components/CustomBackdrop';

const initialValues: LoginRequest = {
    email: '',
    password: '',
};

const Login = () => {
    const [state, setState] = useState({
        loading: false,
    });

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleFormSubmit = async (values: LoginRequest) => {
        setState((c) => ({ ...c, loading: true }));

        try {
            const response = await loginService(values);

            setAuth((prev: any) => ({
                ...prev,
                isAuth: true,
                role: response.data.data?.role,
                fullName: response.data.data?.fullName,
                email: response.data.data?.email,
            }));

            encryptData(localStorageVariables.token, response.data.data?.accessToken);

            successMessage('Sisteme giriş yapıldı!');
        } catch (err) {
            errorMessage('Hatalı işlem');
        }

        setState((c) => ({ ...c, loading: false }));
    };

    return (
        <Container
            maxWidth='xs'
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingY: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <HelpOutlineIcon fontSize='large' color='primary' />
                <Typography component='h1' variant='h2'>
                    GİRİŞ YAP
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ values, errors, touched, handleBlur, handleChange }) => (
                            <Form>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Adresi'
                                    autoFocus
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name='email'
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Şifre'
                                    type='password'
                                    id='password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name='password'
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />
                                <Button
                                    fullWidth
                                    size='large'
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    type='submit'
                                >
                                    GİRİŞ YAP
                                </Button>
                                <Button
                                    fullWidth
                                    size='large'
                                    color='secondary'
                                    variant='contained'
                                    onClick={() => navigate(paths.studentRegister)}
                                >
                                    Üye Ol
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
            <Box display='flex' justifyContent='center'>
                <Typography
                    variant='h5'
                    component='span'
                    textAlign='center'
                    marginTop={8}
                    sx={{ fontStyle: 'italic', color: 'primary.main' }}
                >
                    GAZI QUIZ
                </Typography>
            </Box>
            {state.loading && <CustomBackdrop />}
        </Container>
    );
};

export default Login;
