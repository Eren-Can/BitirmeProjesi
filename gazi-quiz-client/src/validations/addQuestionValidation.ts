import * as yup from 'yup';

const validations = yup.object().shape({
    content: yup.string().min(50, 'En az 50 karakter içermelidir.').required('Zorunlu alan'),
});

export default validations;
