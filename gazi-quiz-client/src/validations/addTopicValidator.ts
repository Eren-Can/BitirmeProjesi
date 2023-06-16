import * as yup from 'yup';

const validations = yup.object().shape({
    name: yup.string().max(50, 'En fazla 50 karakter içerebilir.').required('Zorunlu alan.'),
    lessonId: yup.string().required('Zorunlu alan.'),
});

export default validations;
