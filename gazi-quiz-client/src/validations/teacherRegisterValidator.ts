import * as yup from 'yup';

const validations = yup.object().shape({
    email: yup
        .string()
        .email('Email formatında olmalıdır.')
        .max(50, 'En fazla 50 karakter içerebilir.')
        .required('Zorunlu alan.'),
    password: yup
        .string()
        .min(6, 'En az 6 karakter içermelidir.')
        .max(50, 'En fazla 50 karakter içerebilir.')
        .required('Zorunlu alan.'),
    fullName: yup.string().max(50, 'En fazla 50 karakter içerebilir.').required('Zorunlu alan.'),
});

export default validations;
