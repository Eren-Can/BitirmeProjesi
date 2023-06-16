import * as yup from 'yup';

const validations = yup.object().shape({
    topicId: yup.string().required('Zorunlu alan.'),
    name: yup.string().max(50, 'En fazla 50 karakter içerebilir.').required('Zorunlu alan.'),
});

export default validations;
