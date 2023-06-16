import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import paths from '../../utils/constants/paths';
import { useAuth } from '../../contexts/AuthContext';
import StudentRegisterRequest from '../../models/auth/request/StudentRegisterRequest';
import { useState } from 'react';
import { studentRegisterService } from '../../services/authService';
import { encryptData } from '../../core/cryptoToken';
import localStorageVariables from '../../utils/constants/localStorageVariables';
import { errorMessage, successMessage } from '../../core/toastify';
import CustomBackdrop from '../../components/CustomBackdrop';
import { Form, Formik } from 'formik';
import validationSchema from '../../validations/studentRegisterValidator';

const initialValues: StudentRegisterRequest = {
    email: '',
    password: '',
    fullName: '',
    schoolNumber: '',
};

const StudentRegister = () => {
    const [state, setState] = useState({
        loading: false,
    });

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleFormSubmit = async (values: StudentRegisterRequest) => {
        setState((c) => ({ ...c, loading: true }));

        try {
            const response = await studentRegisterService(values);

            setAuth((prev: any) => ({
                ...prev,
                isAuth: true,
                role: response.data.data?.role,
                fullName: response.data.data?.fullName,
                email: response.data.data?.email,
            }));

            encryptData(localStorageVariables.token, response.data.data?.accessToken);

            successMessage('Sisteme üye olundu!');
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
                    Öğrenci Üye Ol
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
                                    label='Ad Soyad'
                                    autoFocus
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullName}
                                    name='fullName'
                                    error={!!touched.fullName && !!errors.fullName}
                                    helperText={touched.fullName && errors.fullName}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Okul No'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.schoolNumber}
                                    name='schoolNumber'
                                    error={!!touched.schoolNumber && !!errors.schoolNumber}
                                    helperText={touched.schoolNumber && errors.schoolNumber}
                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    label='Email Adresi'
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
                                    ÜYE OL
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                onClick={() => navigate(paths.login)}
                                fullWidth
                                size='large'
                                color='secondary'
                                variant='contained'
                            >
                                GİRİŞ YAP
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                fullWidth
                                size='large'
                                variant='outlined'
                                onClick={() => navigate(paths.teacherRegister)}
                            >
                                ÖĞRETMEN ÜYE OL
                            </Button>
                        </Grid>
                    </Grid>
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

export default StudentRegister;
