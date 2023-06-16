import * as yup from 'yup';

const validations = yup.object().shape({
    lessonId: yup.string().required('Zorunlu alan.'),
});

export default validations;
